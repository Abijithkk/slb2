import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  getProfile,
  updateProfile,
  updateProfileImage,
  toggleDutyStatus,
  getViewMainTrainings,
  getOverallTrainingOTC,
  fetchNotifications,
} from "../services/allApi";
import Header from "../components/Header";
import EXT from "../components/EXT";
import { BASE_URL } from "../services/baseUrl";
import Swal from "sweetalert2";

function Profile() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userid");
  const [selectedHeading, setSelectedHeading] = useState("External Training");
  const [selectedMainTrainingId, setSelectedMainTrainingId] = useState(1);
  const [showContent, setShowContent] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [companyOptions, setCompanyOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    fullname: "",
    designation: "",
    gatePassNo: "",
    project: { id: "", name: "" },
    rig: "",
    company: { id: "", name: "" },
    profile_photo:
      "https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [onDuty, setOnDuty] = useState(false);
  const [trainingOptions, setTrainingOptions] = useState([]);
  const [overallTrainingOTC, setOverallTrainingOTC] = useState(0);
  const [fetchError, setFetchError] = useState(false); // State for handling errors
  const [loading, setLoading] = useState(true); // Loading state
  const [trainings, setTrainings] = useState([]); // Define trainings state and setTrainings function

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const profileResult = await getProfile(userId);
          if (!profileResult || !profileResult.fullname) {
            setFetchError(true);
            setLoading(false);
            return;
          }
          setProfileData(profileResult);
          console.log("kajaa",profileResult);
          setFormValues({
            fullname: profileResult.fullname,
            designation: profileResult.designation,
            gatePassNo: profileResult.gate_pass_no,
            project: profileResult.project || { id: "", name: "" },
            rig: profileResult.rig_or_rigless,
            company: profileResult.company || { id: "", name: "" },
            profile_photo:
              profileResult.profile_photo || formValues.profile_photo,
          });
          setOnDuty(profileResult.on_duty);
          const response = await fetch(`${BASE_URL}/api/viewcompanies/`);
          const data = await response.json();
          setCompanyOptions(data);
          const trainingsResponse = await getViewMainTrainings();
          setTrainingOptions(trainingsResponse);
          const otcResponse = await getOverallTrainingOTC(userId);
          const otcValue = Math.min(
            otcResponse.average_completion_percentage,
            100
          ); // Ensure OTC does not exceed 100%
          setOverallTrainingOTC(otcValue);
          console.log(otcResponse);
          const projectsResponse = await fetch(`${BASE_URL}/api/viewprojects/`);
          const projectsData = await projectsResponse.json();
          setProjectOptions(projectsData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setFetchError(true);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId, navigate, formValues.profile_photo]);
  useEffect(() => {
    // Fetch designation options or set them directly if static
    const fetchDesignationOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/designations/`); // Adjust URL as per your API endpoint
        const data = await response.json();
        setDesignationOptions(data); // Assuming data is an array of designation objects
      } catch (error) {
        console.error("Error fetching designation options:", error);
      }
    };
  
    fetchDesignationOptions();
  }, []);
  const handleDutyToggle = async () => {
    try {
      const response = await toggleDutyStatus(userId, !onDuty);
      setOnDuty(response.on_duty);
      console.log(response);
    } catch (error) {
      console.error("Error toggling duty status:", error);
    }
  };
  const fetchData = async () => {
    try {
      const profileResult = await getProfile(userId);
      if (!profileResult || !profileResult.fullname) {
        setFetchError(true);
        setLoading(false);
        return;
      }
      setProfileData(profileResult);
      setFormValues({
        fullname: profileResult.fullname,
        designation: profileResult.designation || { id: "", name: "" },
        gatePassNo: profileResult.gate_pass_no,
        project: profileResult.project || { id: "", name: "" },
        rig: profileResult.rig_or_rigless,
        company: profileResult.company || { id: "", name: "" },
        profile_photo: profileResult.profile_photo || formValues.profile_photo,
      });
      setOnDuty(profileResult.on_duty);
      // Remaining fetch operations...
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError(true);
      setLoading(false);
    }
  };
  
  // Notification count
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    getNotificationCount();
  }, []);
  const getNotificationCount = async () => {
    try {
      const notifications = await fetchNotifications();
      setNotificationCount(notifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleEditClick = async () => {
    if (isEditMode) {
      try {
        const updatedData = {
          fullname: formValues.fullname || profileData.fullname,
          designation_id: formValues.designation.id || profileData.designation.id,
          gate_pass_no: formValues.gatePassNo || profileData.gate_pass_no,
          project_id: formValues.project.id || profileData.project.id,
          rig_or_rigless: formValues.rig || profileData.rig_or_rigless,
          company_id: formValues.company.id || profileData.company.id,
          mobile_number: profileData.mobile_number,
        };
        const result = await updateProfile(profileData.id, updatedData);
        console.log(result); // Check if designation data is correctly updated
  
        // Optionally, fetch profile data again to update state
        fetchData(); // Ensure this function re-fetches profile data
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditMode(false); // Exit edit mode
      } catch (error) {
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update profile",
        });
      }
    } else {
      setIsEditMode(true); // Enter edit mode
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "project") {
      const selectedProject = projectOptions.find(
        (project) => project.id === parseInt(value)
      );
      setFormValues({ ...formValues, project: selectedProject });
    } else if (name === "company") {
      const selectedCompany = companyOptions.find(
        (company) => company.id === parseInt(value)
      );
      setFormValues({ ...formValues, company: selectedCompany });
    } else if (name === "designation") {
      const selectedDesignation = designationOptions.find(
        (designation) => designation.id === parseInt(value)
      );
      setFormValues({ ...formValues, designation: selectedDesignation });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  

  const handleHeadingClick = async (heading) => {
    try {
      console.log("Selected Heading:", heading);
      const selectedMainTraining = trainingOptions.find(
        (training) => training.name === heading
      );
      if (!selectedMainTraining) {
        console.error("Selected main training not found");
        return;
      }
      setSelectedMainTrainingId(selectedMainTraining.id); // Set the main training ID
      console.log("maintraining id ", selectedMainTraining);
      // Fetch subtrainings data based on the selected main training ID
      const response = await fetch(
        `${BASE_URL}/api/employee/${userId}/main-training/${selectedMainTraining.id}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subtrainings data");
      }
      const data = await response.json();
      console.log("Subtrainings Data:", data);
      setTrainings(data.sub_trainings);

      setSelectedHeading(heading);
      setShowContent(true);
    } catch (error) {
      console.error("Error fetching subtrainings data:", error);
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || !selectedFile.type.match("image/*")) {
      return alert("Please select a valid image file.");
    }
    const id = sessionStorage.getItem("userid");
    const formData = new FormData();
    formData.append("profile_photo", selectedFile);
    setFormValues({ ...formValues, profile_photo: selectedFile });
    updateProfileImage(id, formData)
      .then((updatedProfile) => {
        setFormValues({
          ...formValues,
          profile_photo: updatedProfile.profile_photoUrl,
        });
        Swal.fire({
          icon: "success",
          title: "Profile Photo Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating profile image:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update profile photo",
        });
      });
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Header notificationCount={notificationCount} />
      <div className="profile-wrapper mt-3">
        <Container fluid>
          <Row className="profile-container">
            <Col sm={12} md={3} className="menu" style={{ marginLeft: "3%" }}>
              <div className="profile-info">
                <div className="profile-image">
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={handleDutyToggle}
                      checked={onDuty}
                    />
                    <span className="slider"></span>
                  </label>

                  <div>
                    <img
                      src={formValues.profile_photo || "https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"}
                      alt="Profile"
                      onClick={() => {
                        document.getElementById("profileImageInput").click();
                      }}
                    />

                    <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </div>
                </div>
                <div className="profile-details">
  {isEditMode ? (
    <>
      <input
        style={{
          border: "none",
          textAlign: "center",
          width: "100%",
        }}
        type="text"
        name="fullname"
        id="name"
        value={formValues.fullname}
        onChange={handleInputChange}
      />
      <select
        style={{
          border: "none",
          textAlign: "center",
          width: "100%",
        }}
        name="designation"
        value={formValues.designation.id} // Assuming you need the ID for the select
        onChange={handleInputChange}
      >
        {designationOptions.map((designation) => (
          <option key={designation.id} value={designation.id}>
            {designation.name}
          </option>
        ))}
      </select>
    </>
  ) : (
    <>
      <p id="name">{profileData.fullname}</p>
      <p id="job">{profileData.designation.name}</p>
    </>
  )}
</div>

              </div>
              <div className="progress-containerr">
                <p id="otc">Overall training Coefficient(OTC)</p>
                <ProgressBar
                  style={{ height: "13px" }}
                  now={overallTrainingOTC}
                  label={`${overallTrainingOTC}%`}
                  variant={overallTrainingOTC < 95 ? "danger" : "success"}
                />
              </div>
              <p className="form-heading">Training records</p>
              <form className="training-form">
                <div className="form-row">
                  <div className="form-col-left">Gate Pass No.</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <input
                        style={{ border: "none", textAlign: "end" }}
                        type="text"
                        name="gatePassNo"
                        value={formValues.gatePassNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      formValues.gatePassNo
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Project</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <select
                        style={{ border: "none", textAlign: "end" }}
                        name="project"
                        value={formValues.project.id}
                        onChange={handleInputChange}
                      >
                        {projectOptions.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      formValues.project.name
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Rig/Rigless</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <select
                        style={{ border: "none", textAlign: "end" }}
                        name="rig"
                        value={formValues.rig}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="Rig">Rig</option>
                        <option value="Rigless">Rigless</option>
                      </select>
                    ) : (
                      formValues.rig
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Company</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <select
                        style={{ border: "none", textAlign: "end" }}
                        name="company"
                        value={formValues.company.id}
                        onChange={handleInputChange}
                      >
                        {companyOptions.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      formValues.company.name
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleEditClick}
                  style={{
                    marginLeft: "73%",
                    border: "none",
                    backgroundColor: "#E6E6E6",
                    width: "26%",
                    height: "35px",
                    color: "black",
                  }}
                >
                  {isEditMode ? "Save" : "Edit"}
                </Button>
              </form>
            </Col>
            <Col sm={12} md={8} className="content" style={{ marginLeft: "2%" }}>
              <div className="heading-section">
                <div
                  className="heading-list"
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  {trainingOptions.map((training) => (
                    <div
                      key={training.id}
                      className={
                        selectedHeading === training.name
                          ? "heading selected"
                          : "heading"
                      }
                      onClick={() => handleHeadingClick(training.name)}
                    >
                      {training.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section">
                {showContent && (
                  <EXT
                    mainTrainingId={selectedMainTrainingId}
                    setTrainings={setTrainings}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
