import React, { useEffect, useState, useRef } from "react";
import { Button, Col, ProgressBar, Row, Modal, Form } from "react-bootstrap";
import "../pages/Profile.css";
import { BASE_URL } from "../services/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";

function EXT({ mainTrainingId }) {
  const [trainings, setTrainings] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [addedTrainings, setAddedTrainings] = useState({});
  const [trainingProgress, setTrainingProgress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subtrainingToRemove, setSubtrainingToRemove] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [employeeSubTrainingIdToVerify, setEmployeeSubTrainingIdToVerify] =
    useState(null);
  const employeeId = sessionStorage.getItem("userid");
  const fileInputRef = useRef(null);
  const [hasPdf, setHasPdf] = useState(false); // State to track if any subtraining has a PDF
  const [pdfUrl, setPdfUrl] = useState("");
  const [verifyPdf, setVerifyPdf] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/main-training/${mainTrainingId}/sub-trainings/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTrainings(data);
  
      const progressResponse = await fetch(
        `${BASE_URL}/api/employee/${employeeId}/main-training/${mainTrainingId}/`
      );
      if (!progressResponse.ok) {
        throw new Error("Failed to fetch progress data");
      }
      const progressData = await progressResponse.json();
      setTrainingProgress(progressData);
  
      // Check if there are PDFs in progressData and extract the PDF URL
      const pdfTraining = progressData.find(training => training.pdf);
      const hasPdfInProgressData = !!pdfTraining;
      setHasPdf(hasPdfInProgressData);
      setPdfUrl(pdfTraining?.pdf || "");
  
      // Set the verify_pdf value
      setVerifyPdf(pdfTraining?.verify_pdf);
  
    } catch (error) {
      console.error("Error fetching training data:", error);
    }
  };
  
  
  

  useEffect(() => {
    fetchData();
  }, [employeeId, mainTrainingId]);

  const handleAddClick = (trainingId) => {
    const employee = sessionStorage.getItem("userid");
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    setFormData((prevState) => ({
      ...prevState,
      [trainingId]: {
        ...prevState[trainingId],
        employee: employee,
        sub_training: trainingId,
        start_date: prevState[trainingId]?.start_date || formattedCurrentDate,
      },
    }));
    setAddedTrainings((prevState) => ({
      ...prevState,
      [trainingId]: true,
    }));
  };

  const handleRemoveClick = async (subTrainingId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/employees/${employeeId}/subtrainings/${subTrainingId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete training");
      }
      setTrainingProgress((prevState) =>
        prevState.filter((item) => item.sub_training_id !== subTrainingId)
      );
      setAddedTrainings((prevState) => ({
        ...prevState,
        [subTrainingId]: false,
      }));
      setFormData((prevState) => {
        const updatedFormData = { ...prevState };
        delete updatedFormData[subTrainingId];
        return updatedFormData;
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting training data:", error);
    }
  };

  const handleShowModal = (trainingId) => {
    setSubtrainingToRemove(trainingId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmRemove = () => {
    handleRemoveClick(subtrainingToRemove);
    setShowModal(false);
  };

  const handleUpdateClick = () => {
    setIsEditMode(true);
  };

  const handleSubmitClick = async () => {
    setIsEditMode(false);
    for (const trainingId in formData) {
      const data = formData[trainingId];
      try {
        const response = await fetch(
          `${BASE_URL}/api/employee-sub-trainings/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        await response.json();
        fetchData();
      } catch (error) {
        console.error("Error submitting training data:", error);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleInputChange = (event, trainingId) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === "start_date" && value) {
      const dateObj = new Date(value);
      formattedValue = dateObj.toISOString().split("T")[0];
    }
    setFormData((prevState) => ({
      ...prevState,
      [trainingId]: {
        ...prevState[trainingId],
        [name]: formattedValue,
      },
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 1 * 1024 * 1024;
    if (file && file.size > maxSize) {
      alert("File size exceeds the 1MB limit. Please select a smaller file.");
      setSelectedFile(null);
      fileInputRef.current.value = null;
    } else {
      setSelectedFile(file);
    }
  };

  const handleUploadCertificate = async (employeeSubTrainingId) => {
    if (!selectedFile || !selectedTrainingId) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("employee", employeeId);
    formData.append("pdf", selectedFile);

    try {
      const response = await fetch(
        `${BASE_URL}/api/employee-sub-trainings/${employeeSubTrainingId}/update-pdf/`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload certificate");
      }

      const verifyResponse = await fetch(
        `${BASE_URL}/api/employee-sub-training/${employeeSubTrainingId}/verify-pdf/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verify_pdf: true }),
        }
      );
      if (!verifyResponse.ok) {
        throw new Error("Failed to verify certificate");
      }

      alert("Certificate uploaded and verified successfully");
      setSelectedFile(null);
      setSelectedTrainingId(null);
      fetchData();
    } catch (error) {
      console.error("Error uploading or verifying certificate:", error);
      alert("Error uploading or verifying certificate");
    }
  };

  const handleCertificateButtonClick = (employeeSubTrainingId) => {
    setSelectedTrainingId(employeeSubTrainingId);
    fileInputRef.current.click();
  };

  const handleAUploadCertificate = async (sid) => {
    if (!selectedFile || !selectedTrainingId) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("employee", employeeId);
    formData.append("pdf", selectedFile);

    try {
      const response = await fetch(
        `${BASE_URL}/api/employee-sub-trainings/${sid}/update-pdf/`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload certificate");
      }

      const verifyResponse = await fetch(
        `${BASE_URL}/api/employee-sub-training/${sid}/verify-pdf/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verify_pdf: true }),
        }
      );
      if (!verifyResponse.ok) {
        throw new Error("Failed to verify certificate");
      }

      alert("Certificate uploaded and verified successfully");
      setSelectedFile(null);
      setSelectedTrainingId(null);
      fetchData();
    } catch (error) {
      console.error("Error uploading or verifying certificate:", error);
      alert("Error uploading or verifying certificate");
    }
  };
  const handleACertificateButtonClick = (employeeAsubtrainingID) => {
    setSelectedTrainingId(employeeAsubtrainingID);
    fileInputRef.current.click();
  };
  const handleVerifyButtonClick = (employeeSubTrainingId) => {
    setEmployeeSubTrainingIdToVerify(employeeSubTrainingId);
    setShowVerifyModal(true);
  };

  const handleVerifyClose = () => {
    setShowVerifyModal(false);
    setVerificationStatus(null);
  };

  const handleVerificationChange = (event) => {
    setVerificationStatus(event.target.value);
  };

  const handleVerificationSubmit = async () => {
    if (verificationStatus === null) {
      alert("Please select a verification status.");
      return;
    }
    const verifyPdf = verificationStatus === "verify";
    try {
      const response = await fetch(
        `${BASE_URL}/api/employee-sub-training/${employeeSubTrainingIdToVerify}/verify-pdf/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verify_pdf: verifyPdf }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to verify certificate");
      }
      alert("Verification status updated successfully");
      handleVerifyClose();
      fetchData();
    } catch (error) {
      console.error("Error verifying certificate:", error);
      alert("Error verifying certificate");
    }
  };

  const renderTrainingRows = () => {
    if (!trainings || trainings.length === 0) {
      return <div>No training data available</div>;
    }

    return trainings.map((training, index) => {
      const trainingData = trainingProgress.find(
        (item) => item.sub_training_name === training.name
      );
      const employeeSubTrainingId = trainingData?.employee_sub_training_id;
      const employeeAsubtrainingID=trainings
      console.log("prithvi",trainingData?trainingData.employee_sub_training_id:null);
      sessionStorage.setItem("subid",trainingData?trainingData.employee_sub_training_id:null)
      const pdfUrl = trainingData?.pdf;
      const verifyPdf = trainingData?.verify_pdf;
      console.log("Training Data:", trainingData);
      return (
        
        <Row key={index}>
          <p id="subtrainingid">
            <b>{training.name}</b>
          </p>
          <Col md={6}>
            <div className="bar-container" style={{ width: "100%" }}>
              <ProgressBar
                style={{ height: "16px" }}
                className="w-100"
                variant={
                  trainingData?.completion_percentage === 0
                    ? "danger"
                    : "success"
                }
                now={
                  trainingData?.completion_percentage === 0 ||
                  trainingData?.completion_percentage === 100
                    ? 100
                    : 0
                }
                label={
                  trainingData?.completion_percentage === 0
                    ? "Expired"
                    : trainingData?.completion_percentage === 100
                    ? "100%"
                    : ""
                }
              />
            </div>
          </Col>
          {(trainingData?.completion_percentage >= 0 || isEditMode) && (
            <>
              <Col style={{ marginInline: "auto" }} md={2}>
                <p id="startendd" style={{ whiteSpace:'nowrap' }}>
                  <b>
                    {trainingData?.completion_percentage >= 0
                      ? "End Date"
                      : "Start Date"}
                  </b>
                </p>
                <input id="startend"
                  style={{ padding: "5px", width: "100%" }}
                  type={
                    trainingData?.completion_percentage >= 0 ? "text" : "date"
                  }
                  className="form-control"
                  name={
                    trainingData?.completion_percentage >= 0
                      ? "expiration_date"
                      : "start_date"
                  }
                  value={
                    trainingData?.completion_percentage >= 0
                      ? trainingData?.expiration_date || "Permanent"
                      : formData[training.id]?.start_date || ""
                  }
                  readOnly={trainingData?.completion_percentage >= 0}
                  onChange={(e) => handleInputChange(e, training.id)}
                />
              </Col>
              {mainTrainingId !== 5 && (
                <Col>
                
                  {isEditMode && (
                    <>
                      {["0", "100"].includes(
                        trainingData?.completion_percentage?.toString()
                      ) && (
                        <>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                          <Button
                            onClick={() =>
                              handleCertificateButtonClick(
                                employeeSubTrainingId
                              )
                            }
                          >
                            {selectedTrainingId === employeeSubTrainingId &&
                            selectedFile
                              ? selectedFile.name
                              : "Certificate"}
                          </Button>
                          {selectedTrainingId === employeeSubTrainingId && (
                            <button style={{ marginLeft: "50%", width: "34%" }}>
                              <FontAwesomeIcon
                                icon={faUpload}
                                onClick={() =>
                                  handleUploadCertificate(employeeSubTrainingId)
                                }
                              />
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {pdfUrl && !isEditMode && (
                    <>
                      <Button id="download"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => window.open(pdfUrl, "_blank")}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          style={{ marginLeft: "8px", whiteSpace: "nowrap" }}
                        />{" "}
                        Download 
                      </Button>
                      <Button
                        style={{
                          
                          borderColor: verifyPdf === false ? "red" : "inherit",
                          background: verifyPdf === false ? "red" : "#0d6efd",
                         
                        }}
                        onClick={() =>
                          handleVerifyButtonClick(employeeSubTrainingId)
                        }
                        disabled={verifyPdf}
                      >
                        {verifyPdf === null
                          ? "Verify"
                          : verifyPdf
                          ? "Verified"
                          : "Rejected"}
                      </Button>
                    </>
                  )}
                </Col>
              )}
              <Col md={2}>
                {isEditMode && (
                  <Button id="addedremove"
                    style={{
                      border: "3px solid",
                      fontWeight: 550,
                      marginLeft: "22px",
                      whiteSpace:'nowrap'
                    }}
                    className="w-80"
                    variant={
                      trainingData?.completion_percentage >= 0
                        ? "outline-danger"
                        : "outline-success"
                    }
                    onClick={() =>
                      trainingData?.completion_percentage >= 0
                        ? handleShowModal(training.id)
                        : handleAddClick(training.id)
                    }
                  >
                    {trainingData?.completion_percentage >= 0
                      ? "Remove"
                      : addedTrainings[training.id]
                      ? "Added"
                      : "Add"}
                  </Button>
                )}
              </Col>
            </>
          )}
        </Row>
      );
    
    });
    
  };
  
const sidd=sessionStorage.getItem("subid")
  return (
    <div>
      <div style={{ height: "auto" }} className="card shadow p-3 mt-2">
      {mainTrainingId === 5 && hasPdf && (
  <Row style={{ marginLeft: '58%' }}>
    <Col>
      {!isEditMode && (
        <Button
          style={{ whiteSpace: "nowrap", marginLeft: '30%', width: '80%' }}
          onClick={() => window.open(pdfUrl, '_blank')}
        >
          Download
          <FontAwesomeIcon
            icon={faDownload}
            style={{ marginLeft: "8px", whiteSpace: "nowrap" }}
          />
        </Button>
      )}
    </Col>
    <Col>
      {!isEditMode && (
        <Button
          onClick={() => handleVerifyButtonClick(sidd)}
          disabled={verifyPdf === true}
          style={{ backgroundColor: verifyPdf === true ? 'grey' : verifyPdf === false ? 'red' : 'initial',border:'none' }}
        >
          {verifyPdf === null && "Verify pdf"}
          {verifyPdf === true && "Verified"}
          {verifyPdf === false && "Rejected"}
        </Button>
      )}
    </Col>
  </Row>
)}

      

      {mainTrainingId === 5 && (
        
  isEditMode ? (
    <Col>
      <>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {trainings.length > 0 && (
          <Button
            style={{ textAlign: 'end' }}
            className="me-3"
            onClick={() => handleACertificateButtonClick(sidd)}
          >
            {selectedTrainingId === sidd && selectedFile
              ? selectedFile.name
              : "Awareness pdf"}
          </Button>
        )}
        {selectedTrainingId === sidd && (
          <Button onClick={() => handleAUploadCertificate(sidd)}>
            <FontAwesomeIcon icon={faUpload} />
          </Button>
        )}
      </>
    </Col>
  ) : null

  
)}





        {renderTrainingRows()}
        {isEditMode ? (
          <Row>
            <Col>
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: "1rem",
                  border: "none",
                  backgroundColor: "#E6E6E6",
                  height: "35px",
                  color: "black",
                }}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                style={{
                  marginLeft: "auto",
                  border: "none",
                  backgroundColor: "rgba(0, 20, 220, 1)",
                  height: "35px",
                  color: "white",
                }}
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Button
                style={{
                  border: "none",
                  backgroundColor: "rgba(0, 20, 220, 1)",
                  height: "35px",
                  color: "white",
                }}
                onClick={handleUpdateClick}
              >
                Update
              </Button>
            </Col>
          </Row>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this subtraining?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showVerifyModal} onHide={handleVerifyClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              label="Verify"
              name="verificationStatus"
              value="verify"
              checked={verificationStatus === "verify"}
              onChange={handleVerificationChange}
            />
            <Form.Check
              type="radio"
              label="Reject"
              name="verificationStatus"
              value="reject"
              checked={verificationStatus === "reject"}
              onChange={handleVerificationChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVerifyClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVerificationSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EXT;
