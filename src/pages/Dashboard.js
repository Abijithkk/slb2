import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import Header from "../components/Header";
import CustomProgressBar from "./CircularProgressBar";
import axios from "axios";
import "./Dashboard.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fetchNotifications } from "../services/allApi";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedProject, setSelectedProject] = useState("Select Project");
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [selectedTraining, setSelectedTraining] = useState("Select Training");
  const [selectedDesignation, setSelectedDesignation] =
    useState("Select Designation");
  const [selectedDuty, setSelectedDuty] = useState("Select Duty");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [fullCompletionEmployees, setFullCompletionEmployees] = useState(0);
  const [highEmployees, setHighEmployees] = useState(0);
  const [lowEmployees, setLowEmployees] = useState(0);
  const [otcPercentage, setOtcPercentage] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [selectedDesignationId, setSelectedDesignationId] = useState(null);

  // State for progress data and animated progress values
  const [progressData, setProgressData] = useState([]);
  const [progressValues, setProgressValues] = useState([]);
  const [subTrainings, setSubTrainings] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null); // Collapse if already expanded
    } else {
      fetchSubTrainings(id); // Fetch sub-trainings when expanding
      setExpandedCard(id);
    }
  };
  
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get(
          "https://codeedexpython.pythonanywhere.com/api/notifications/"
        );
        const latestActivities = response.data.slice(0, 5); // Get only the latest five activities
        setRecentActivities(latestActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

  
    
    

  
  
    fetchRecentActivities();
    fetchTrainings();
   
    

    // Trigger animation of progress bars
    const animateProgressBars = () => {
      const interval = 50; // Interval duration in ms
      const duration = 1500; // Total duration of animation in ms
      const steps = duration / interval;

      let stepCount = 0;
      const intervalId = setInterval(() => {
        stepCount += 1;
        setProgressValues((prevValues) =>
          prevValues.map((value, index) =>
            Math.min(
              progressData[index]?.value || 0,
              value + (progressData[index]?.value || 0) / steps
            )
          )
        );
        if (stepCount >= steps) {
          clearInterval(intervalId);
        }
      }, interval);
    };

    animateProgressBars();
  }, [progressData]);

  const fetchData = async () => {
    try {
      const params = {};
      if (selectedProjectId) params.project_id = selectedProjectId;
      if (selectedCompanyId) params.company_id = selectedCompanyId;
      if (selectedTrainingId) params.main_training_id = selectedTrainingId;
      if (selectedDesignationId) params.designation_id = selectedDesignationId;
      if (selectedDuty && selectedDuty !== "Select Duty")
        params.on_duty = selectedDuty === "On Duty";
  
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/dashboard-filter/",
        { params }
      );
      if (response.data.detail === "No employees found matching the criteria.") {
        setFullCompletionEmployees(0);
        setLowEmployees(0);
        setTotalEmployees(0);
      } else {
        setFullCompletionEmployees(response.data.count_100);
        setLowEmployees(response.data.count_below_95);
        setTotalEmployees(response.data.total_accepted_employees);
        console.log("kkk",response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setFullCompletionEmployees(0);
      setLowEmployees(0);
      setTotalEmployees(0);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    selectedProjectId,
    selectedCompanyId,
    selectedDesignationId,
    selectedTrainingId,
    selectedDuty,
  ]);
  const fetchTraining = async () => {
    try {
      // Collect filter parameters
      const params = {};
      if (selectedProjectId) params.project_id = selectedProjectId;
      if (selectedCompanyId) params.company_id = selectedCompanyId;
      if (selectedTrainingId) params.main_training_id = selectedTrainingId;
      if (selectedDesignationId) params.designation_id = selectedDesignationId;
      if (selectedDuty && selectedDuty !== "Select Duty")
        params.on_duty = selectedDuty === "On Duty";
  
      // Fetch data from the dashboard-filter API
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/dashboard-filter/",
        { params }
      );
  
      // Handle case where no data is found
      if (response.data.detail === "No employees found matching the criteria.") {
        // Maintain the existing main training structure with 0% completion
        const existingProgressData = Object.entries(response.data.main_training_data).map(([title, data]) => ({
          id: data.main_training_id,
          title,
          value: 0, // Set percentage to 0
        }));
  
        setProgressData(existingProgressData); // Update the state with existing progress data with 0% completion
  
        // Optionally, if you want to fetch sub-trainings, you can still call fetchSubTrainings
        existingProgressData.forEach((data) => fetchSubTrainings(data.title));
  
        console.log("Fetched progress data with no employees:", existingProgressData);
        return; // Exit early
      }
  
      // Extract the main_training_data from the response
      const mainTrainingData = response.data.main_training_data;
  
      // Map the main training data to progress data
      const fetchedProgressData = Object.entries(mainTrainingData).map(([title, data]) => ({
        id: data.main_training_id,
        title,
        value: data.average_completion,
      }));
  
      // Update the state with the fetched progress data
      setProgressData(fetchedProgressData);
  
      // Fetch sub-trainings for each training initially
      fetchedProgressData.forEach((data) => fetchSubTrainings(data.title));
  
      console.log("Fetched progress data:", fetchedProgressData);
    } catch (error) {
      console.error("Error fetching trainings:", error);
      setProgressData([]); // Clear the progress data on error
    }
  };
  
  
  useEffect(() => {
    fetchTraining();
  }, [
    selectedProjectId,
    selectedCompanyId,
    selectedDesignationId,
    selectedTrainingId,
    selectedDuty,
  ]);
  
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/viewcompanies/"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  const fetchTrainings = async () => {
    try {
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/main-trainings/"
      );
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/viewprojects/"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/alldesignations/"
      );
      setDesignations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };
  const fetchOTCPercentage = async () => {
    try {
      const params = {};
      if (selectedProjectId) params.project_id = selectedProjectId;
      if (selectedCompanyId) params.company_id = selectedCompanyId;
      if (selectedTrainingId) params.main_training_id = selectedTrainingId;
      if (selectedDesignationId) params.designation_id = selectedDesignationId;
      if (selectedDuty && selectedDuty !== "Select Duty")
        params.on_duty = selectedDuty === "On Duty";

      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/dashboard-filter/",
        { params }
      );
      if (
        response.data.detail === "No employees found matching the criteria."
      ) {
        setOtcPercentage(0);
      } else {
        setOtcPercentage(response.data.overall_average_completion_percentage);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching OTC percentage:", error);
      setOtcPercentage(0);
    }
  };

  useEffect(() => {
    fetchOTCPercentage();
  }, [
    selectedProjectId,
    selectedCompanyId,
    selectedDesignationId,
    selectedTrainingId,
    selectedDuty,
  ]);

  const fetchSubTrainings = async () => {
    try {
      const params = {};
      if (selectedProjectId) params.project_id = selectedProjectId;
      if (selectedCompanyId) params.company_id = selectedCompanyId;
      if (selectedTrainingId) params.main_training_id = selectedTrainingId;
      if (selectedDesignationId) params.designation_id = selectedDesignationId;
      if (selectedDuty && selectedDuty !== "Select Duty")
        params.on_duty = selectedDuty === "On Duty";
  
      const response = await axios.get(
        "https://codeedexpython.pythonanywhere.com/api/dashboard-filter/",
        { params }
      );
  
      if (response.data.detail === "No sub-trainings found matching the criteria.") {
        setSubTrainings({});
      } else {
        const subTrainingData = response.data.sub_training_data || {};
        setSubTrainings(subTrainingData);
        console.log(subTrainingData);
      }
    } catch (error) {
      console.error("Error fetching sub-trainings:", error);
      setSubTrainings({});
    }
  };
  
  useEffect(() => {
    fetchSubTrainings();
  }, [
    selectedProjectId,
    selectedCompanyId,
    selectedDesignationId,
    selectedTrainingId,
    selectedDuty,
  ]);
  
  

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

  return (
    <div>
      <Header notificationCount={notificationCount} />
      <Container className="mt-3" fluid>
        
        <Row className="mb-4">
          <Col lg={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <h5 className="text-center">
                  <b>Overall Training Coefficient</b>
                </h5>
                <div style={{ width: 200, height: 200, margin: "13px auto" }}>
                  <CustomProgressBar value={otcPercentage || 0} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Row className="mt-3">
          <Col>
            <Row style={{ marginTop: "" }}>
              <Col lg={3}>
                <Card
                  style={{
                    padding: "30px",
                    height: "175px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    backgroundColor: "#4A90E2", // Solid background color
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Card.Body>
                    <h6
                      style={{
                        margin: "19px -22px",
                        fontWeight: "bold",
                        fontSize: "20px",
                        whiteSpace:"nowrap"
                      }}
                    >
                      100% Achieved Employees
                    </h6>
                    <h3
                      className="mt-4"
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {fullCompletionEmployees}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={3}>
                <Card
                  style={{
                    padding: "12px",
                    height: "175px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    backgroundColor: "#50E3C2", // Solid background color
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Card.Body>
                    <h6
                      style={{
                        margin: "19px -22px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                     <span>{"<95%"}</span> Achieved Employees
                    </h6>
                    <h3
                      className="mt-4"
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {lowEmployees}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row className="mt-3">
              <Col lg={3}>
                <Card
                  style={{
                    padding: "30px",
                    height: "175px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    backgroundColor: "#ebba00", 
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <Card.Body>
                    <h6
                      style={{
                        margin: "19px -22px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Total Employees
                    </h6>
                    <h3
                      className="mt-4"
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {totalEmployees}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
          <Col className="dropdownselection" lg={9} >
            <Card className="dashboard-card">
              <Card.Body>
                <div>
                  <Row>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedProject}
                        onClick={fetchProjects}
                        onSelect={(e) => {
                          if (e === "Select Project") {
                            setSelectedProject("Select Project");
                            setSelectedProjectId(null);
                          } else {
                            const project = projects.find(
                              (project) => project.id === parseInt(e)
                            );
                            setSelectedProject(project.name);
                            setSelectedProjectId(project.id);
                          }
                        }}
                        className="custom-dropdown"
                      >
                        {selectedProject !== "Select Project" && (
                          <Dropdown.Item eventKey="Select Project">
                            Select Project
                          </Dropdown.Item>
                        )}
                        {projects.map((project) => (
                          <Dropdown.Item key={project.id} eventKey={project.id}>
                            {project.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedCompany}
                        onClick={fetchCompanies}
                        onSelect={(e) => {
                          if (e === "Select Company") {
                            setSelectedCompany("Select Company");
                            setSelectedCompanyId(null);
                          } else {
                            const company = companies.find(
                              (company) => company.id === parseInt(e)
                            );
                            setSelectedCompany(company.name);
                            setSelectedCompanyId(company.id);
                          }
                        }}
                        className="custom-dropdown"
                      >
                        {selectedCompany !== "Select Company" && (
                          <Dropdown.Item eventKey="Select Company">
                            Select Company
                          </Dropdown.Item>
                        )}
                        {companies.map((company) => (
                          <Dropdown.Item key={company.id} eventKey={company.id}>
                            {company.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedTraining}
                        onClick={fetchTrainings}
                        onSelect={(e) => {
                          if (e === "Select Training") {
                            setSelectedTraining("Select Training");
                            setSelectedTrainingId(null);
                          } else {
                            const training = trainings.find(
                              (training) => training.id === parseInt(e)
                            );
                            setSelectedTraining(training.name);
                            setSelectedTrainingId(training.id);
                          }
                        }}
                        className="custom-dropdown"
                      >
                        {selectedTraining !== "Select Training" && (
                          <Dropdown.Item eventKey="Select Training">
                            Select Training
                          </Dropdown.Item>
                        )}
                        {trainings.map((training) => (
                          <Dropdown.Item
                            key={training.id}
                            eventKey={training.id}
                          >
                            {training.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedDesignation}
                        onClick={fetchDesignations}
                        onSelect={(e) => {
                          if (e === "Select Designation") {
                            setSelectedDesignation("Select Designation");
                            setSelectedDesignationId(null);
                          } else {
                            const designation = designations.find(
                              (designation) => designation.id === parseInt(e)
                            );
                            setSelectedDesignation(designation.name);
                            setSelectedDesignationId(designation.id);
                          }
                        }}
                        className="custom-dropdown"
                      >
                        {selectedDesignation !== "Select Designation" && (
                          <Dropdown.Item eventKey="Select Designation">
                            Select Designation
                          </Dropdown.Item>
                        )}
                        {designations.map((designation) => (
                          <Dropdown.Item
                            key={designation.id}
                            eventKey={designation.id}
                          >
                            {designation.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedDuty}
                        onSelect={(e) => setSelectedDuty(e)}
                        className="custom-dropdown"
                      >
                        {selectedDuty !== "Select Duty" && (
                          <Dropdown.Item eventKey="Select Duty">
                            Select Duty
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item eventKey="On Duty">
                          On Duty
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Off Duty">
                          Off Duty
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
           <div >
              <div>
              <Row noGutters>
  {progressData.map((data, index) => {
    const isExpanded = expandedCards[data.id];
    const visibleSubTrainings = isExpanded ? subTrainings[data.title] : subTrainings[data.title]?.slice(0, 3);

    const colSize = index < 3 ? "col-lg-4" : "col-lg-6";

    return (
      <Col lg={index < 3 ? 4 : 6} md={index < 3 ? 4 : 6} sm={6} xs={12} key={data.id}>
        <Card className="dashboard-card">
          <Card.Body className="card-body">
            <h5 className="text-center">{data.title}</h5>
            <div className="progress-container">
              <CircularProgressbar
                value={data.value}
                text={`${data.value}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "blue",
                  textColor: "#000",
                  rotation: 0.25,
                })}
                strokeWidth={10}
              />
            </div>
          </Card.Body>
          <Card.Footer className="card-footer">
  <Row noGutters>
    {visibleSubTrainings?.map((subTraining, subIndex) => (
      <Col key={subIndex} xs={12}>
        <div className="sub-training-name mt-2">
          <h6 className="sub-training-card">
            {subTraining.sub_training_name}
          </h6>
          <ProgressBar
  style={{ height: '16px', marginTop: '19px', fontWeight: 'bold',borderRadius:'10px' }}
  now={subTraining.completion_percentage}
  label={`${subTraining.completion_percentage}%`}
  variant={subTraining.completion_percentage === 100 ? 'success' : 'primary'}
/>        </div>
      </Col>
    ))}
  </Row>
  {subTrainings[data.title]?.length > 2 && (
 <div
 className="show-more-btn"
 onClick={() => toggleExpand(data.id)}
 style={{ cursor: 'pointer',textAlign:'end',marginTop:'10px' }}
>
 <i  className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
</div>

)}

</Card.Footer>
        </Card>
      </Col>
    );
  })}
</Row>



              </div>
           </div>
          </Col>
        </Row>

        

        <style jsx>{`
          .hover-card:hover {
            transform: scale(1.05);
            background-color: #fea116 !important;
            color: white !important;
          }
        `}</style>
      </Container>
    </div>
  );
};

export default Dashboard;
