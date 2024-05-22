import React, { useEffect, useState } from "react";
import { Button, Col, ProgressBar, Row } from "react-bootstrap";
import "../pages/Profile.css";
import { BASE_URL } from "../services/baseUrl";
import { Modal } from "react-bootstrap";
function SLBCT() {
  const [trainings, setTrainings] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [addedTrainings, setAddedTrainings] = useState({});
  const [trainingProgress, setTrainingProgress] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [subtrainingToRemove, setSubtrainingToRemove] = useState(null);
  const employeeId = sessionStorage.getItem("userid");
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/sub-trainings-main/`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const filteredTrainings = data.filter(training => training.main_training_name === "SLB Certified Training");
      setTrainings(filteredTrainings);
      const progressResponse = await fetch(`${BASE_URL}/api/employee/${employeeId}/main-training/4/`);
      if (!progressResponse.ok) {
        throw new Error('Failed to fetch progress data');
      }
      const progressData = await progressResponse.json();
      const progressMap = {};
      progressData.forEach(progress => {
        progressMap[progress.sub_training_name] = {
          completion_percentage: progress.completion_percentage || 0,
          expiration_date: progress.expiration_date || ''
        };
      });
      setTrainingProgress(progressMap);
    } catch (error) {
      console.error('Error fetching training data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [employeeId]);
  const handleAddClick = (trainingId) => {
    const employee = sessionStorage.getItem('userid');
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedCurrentDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    setFormData(prevState => ({
      ...prevState,
      [trainingId]: {
        ...prevState[trainingId],
        employee: employee,
        sub_training: trainingId,
        start_date: prevState[trainingId]?.start_date ? prevState[trainingId].start_date : formattedCurrentDate,
      },
    }));
    setAddedTrainings(prevState => ({
      ...prevState,
      [trainingId]: true,
    }));
    setTrainingProgress(prevState => ({
      ...prevState,
      [trainingId]: {
        ...prevState[trainingId],
        completion_percentage: prevState[trainingId]?.completion_percentage || 0,
      },
    }));
  };
  const handleRemoveClick = async (trainingId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/employees/${employeeId}/subtrainings/${trainingId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete training");
      }
      setTrainingProgress(prevState => {
        const updatedProgress = { ...prevState };
        delete updatedProgress[trainingId];
        return updatedProgress;
      });
      setAddedTrainings(prevState => ({
        ...prevState,
        [trainingId]: false,
      }));
      setFormData(prevState => {
        const updatedFormData = { ...prevState };
        delete updatedFormData[trainingId];
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
          "https://codeedexbackend.pythonanywhere.com/api/employee-sub-trainings/",
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
    if (name === "start_date") {
      const dateObj = new Date(value);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      formattedValue = `${day < 10 ? "0" + day : day}-${
        month < 10 ? "0" + month : month
      }-${year}`;
    }
    setFormData((prevState) => ({
      ...prevState,
      [trainingId]: {
        ...prevState[trainingId],
        [name]: formattedValue,
      },
    }));
  };
  const renderTrainingRows = () => {
    if (!trainings || trainings.length === 0) {
      return <div>No training data available</div>;
    }
    const sortedTrainings = [...trainings].sort((a, b) => {
      const completionA = trainingProgress[a.name]?.completion_percentage || 0;
      const completionB = trainingProgress[b.name]?.completion_percentage || 0;
      return completionB - completionA;
    });
    return sortedTrainings.map((training, index) => (
      <Row key={index}>
        <p><b>{training.name}</b></p>
        <Col md={6}>
          <div className="bar-container" style={{ width: '100%' }}>
            <ProgressBar
              style={{ height: '16px' }}
              variant={trainingProgress[training.name]?.completion_percentage >= 95 ? "success" : "danger"}
              className="w-100"
              now={trainingProgress[training.name]?.completion_percentage || 0}
              label={`${trainingProgress[training.name]?.completion_percentage || 0}%`}
            />
          </div>
        </Col>
        {(trainingProgress[training.name]?.completion_percentage > 0 || isEditMode) && (
          <>
            <Col md={2}>
              <p style={{ marginTop: '-40px' }}><b>{trainingProgress[training.name]?.completion_percentage > 0 ? 'End Date' : 'Start Date'}</b></p>
              <input
                style={{ padding: '5px', width: '113%' }}
                type={trainingProgress[training.name]?.completion_percentage > 0 ? "text" : "date"}
                className="form-control"
                name={trainingProgress[training.name]?.completion_percentage > 0 ? "expiration_date" : "start_date"}
                value={trainingProgress[training.name]?.completion_percentage > 0 ? trainingProgress[training.name]?.expiration_date : formData[training.id]?.start_date || ''}
                readOnly={trainingProgress[training.name]?.completion_percentage > 0}
                onChange={(e) => handleInputChange(e, training.id)}
              />
            </Col>
            <Col md={2}>
              {isEditMode && (
                <Button
                style={{ border: '3px solid', fontWeight: 550, marginLeft: '22px' }}
                className="w-80"
                variant={trainingProgress[training.name]?.completion_percentage > 0 ? "outline-danger" : "outline-success"}
                onClick={() => trainingProgress[training.name]?.completion_percentage > 0 ? handleShowModal(training.id) : handleAddClick(training.id)}
              >
                {trainingProgress[training.name]?.completion_percentage > 0 ? 'Remove' : (addedTrainings[training.id] ? 'Added' : 'Add')}
              </Button>
              )}
            </Col>
          </>
        )}
      </Row>
    ));
  };
  return (
    <div>
      <div style={{ height: "auto" }} className="card shadow p-3 mt-2">
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
                  marginLeft: "73%",
                  border: "none",
                  backgroundColor: "rgba(0, 20, 220, 1)",
                  height: "35px",
                  color: "white",
                  width: "27%",
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
                  width: "20%",
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
    </div>
  );
}
export default SLBCT;