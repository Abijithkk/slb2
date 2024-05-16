import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import {
  getUserDetails,
  profileSearch,
  updateProfile,
  updateProfileImage,
} from "../services/allApi";
import CCT from '../components/CCT'
import CIT from '../components/CIT'
import EXT from '../components/EXT'
import SLBAT from '../components/SLBAT'
import SLBCT from '../components/SLBCT'
import Header from "../components/Header";





function Profile() {
  
  const progressPercentage = 88; // Change this value as needed
  const [selectedHeading, setSelectedHeading] = useState("External Training");
  const [showContent, setShowContent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState({});
  const [profileImageFile, setProfileImageFile] = useState({});

  const [formValues, setFormValues] = useState({
    gatePassNo: "",
    crew: "",
    project: "",
    rig: "",
    company: "",
  });
  const getAllData = async () => {
    const result = await profileSearch(data);
    console.log(result);
    if (result.status === 200) {
      setData(result.data);
      setFormValues({
        full_name: data.full_name,
        designation: data.designation,
        profile_photo: data.profile_photo,
        gatePassNo: result.data.gate_pass_no,
        crew: result.data.crew,
        project: result.data.project_name,
        rig: result.data.rig_or_rigless,
        company: result.data.company_name,
      });
    } else {
      alert("Profile data not found");
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  const handleEditClick = async () => {
    if (isEditMode) {
      try {
        // Update profile data
        const updatedData = {
          full_name: data.full_name,
          designation: data.designation,
          gate_pass_no: formValues.gatePassNo,
          crew: formValues.crew,
          project_name: formValues.project,
          rig_or_rigless: formValues.rig,
          company_name: formValues.company,
        };
        const result = await updateProfile(data.id, updatedData);
        console.log(result);
        // Update profile image if a new file was selected
        if (profileImageFile) {
          const formData = new FormData();
          formData.append("profileImage", profileImageFile);
          const imageResult = await updateProfileImage(data.id, formData);
          console.log(imageResult);
          // Optionally update the profile image state with the new image URL
        }
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    }
    setIsEditMode(!isEditMode); // Toggle edit mode
  };
  const handleProfileImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleHeadingClick = (heading) => {
    setSelectedHeading(heading); // Set the selected heading
    setShowContent(true); // Always show content when a heading is clicked
  };
  const renderContentComponent = () => {
    switch (selectedHeading) {
    case 'External Training':
      return <EXT/>;
      // Render the Tg component for 'External Training'
     case 'Cairn Certified Training':
         return <CCT/>;
      // Render the Tg component for 'Cairn Certified Training'
      case 'Cairn Introduction Training':
        return <CIT />;
      // Render the YH component for 'Cairn Introduction Training'
      case 'SLB Certified Training':
     return  <SLBCT /> ;
      // Render the Tg component for 'SLB Certified Training'
       case 'SLB Awareness Training':
        return <SLBAT /> ;
      // Render the Tg component for 'SLB Awareness Training'
      default:
        return null;
    }
  };
  return (
    <div>
      <Header />
      <div className="profile-wrapper mt-3">
        <Container fluid>
          <Row className="profile-container">
            <Col sm={3} className="menu" style={{ marginLeft: "3%" }}>
              <div className="profile-info">
                <div className="profile-image">
                  {isEditMode ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                  ) : (
                    <img src={data.profile_photo} alt="Profile" />
                  )}
                </div>
                <div className="profile-details">
                  <p id="name">{data.full_name}</p>
                  <p id="job">{data.designation}</p>
                </div>
              </div>
              <div className="progress-container">
                <p id="otc">Overall training (OTC)</p>
                <ProgressBar
                  style={{ height: "13px" }}
                  now={progressPercentage}
                  label={`${progressPercentage}%`}
                  variant="success"
                />
              </div>
              <p className="form-heading">Training records</p>
              <form className="training-form">
                <div className="form-row">
                  <div className="form-col-left">CIL Gate Pass No.</div>
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
                  <div className="form-col-left">Crew</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <input
                        style={{ border: "none", textAlign: "end" }}
                        type="text"
                        name="crew"
                        value={formValues.crew}
                        onChange={handleInputChange}
                      />
                    ) : (
                      formValues.crew
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Project</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <input
                        style={{ border: "none", textAlign: "end" }}
                        type="text"
                        name="project"
                        value={formValues.project}
                        onChange={handleInputChange}
                      />
                    ) : (
                      formValues.project
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Rig/Rigless</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <input
                        style={{ border: "none", textAlign: "end" }}
                        type="text"
                        name="rig"
                        value={formValues.rig}
                        onChange={handleInputChange}
                      />
                    ) : (
                      formValues.rig
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col-left">Company</div>
                  <div className="form-col-right">
                    {isEditMode ? (
                      <input
                        style={{ border: "none", textAlign: "end" }}
                        type="text"
                        name="company"
                        value={formValues.company}
                        onChange={handleInputChange}
                      />
                    ) : (
                      formValues.company
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
            <Col sm={8} className="content" style={{ marginLeft: "2%" }}>
              <div className="heading-section">
                <div className="heading-list">
                  <div
                    className={
                      selectedHeading === "External Training"
                        ? "heading selected"
                        : "heading"
                    }
                    onClick={() => handleHeadingClick("External Training")}
                  >
                    External Training
                  </div>
                  <div
                    className={
                      selectedHeading === "Cairn Certified Training"
                        ? "heading selected"
                        : "heading"
                    }
                    onClick={() =>
                      handleHeadingClick("Cairn Certified Training")
                    }
                  >
                    Cairn Certified Training
                  </div>
                  <div
                    className={
                      selectedHeading === "Cairn Introduction Training"
                        ? "heading selected"
                        : "heading"
                    }
                    onClick={() =>
                      handleHeadingClick("Cairn Introduction Training")
                    }
                  >
                    Cairn Introduction Training
                  </div>
                  <div
                    className={
                      selectedHeading === "SLB Certified Training"
                        ? "heading selected"
                        : "heading"
                    }
                    onClick={() => handleHeadingClick("SLB Certified Training")}
                  >
                    SLB Certified Training
                  </div>
                  <div
                    className={
                      selectedHeading === "SLB Awareness Training"
                        ? "heading selected"
                        : "heading"
                    }
                    onClick={() => handleHeadingClick("SLB Awareness Training")}
                  >
                    SLB Awareness Training
                  </div>
                </div>
              </div>
              {showContent && renderContentComponent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Profile;