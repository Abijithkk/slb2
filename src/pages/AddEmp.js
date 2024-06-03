import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../components/Header";
import { BASE_URL } from "../services/baseUrl";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { fetchNotifications, updateUserStatus } from "../services/allApi";
import { useNavigate } from "react-router-dom";

function AddEmp() {
  const [formData, setFormData] = useState({
    full_name: "",
    gate_pass_no: "",
    rig_or_rigless: "",
    designation: "",
    project_id: "",
    company_id: "",
    mobile_number: "",
    profile_photo: "",
  });

  const [crewOptions, setCrewOptions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]); // State for project options
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/viewcompanies/`);
        if (!response.ok) {
          throw new Error("Failed to fetch crew options");
        }
        const data = await response.json();
        setCrewOptions(data);
      } catch (error) {
        console.error("Error fetching crew options:", error);
      }
    };

    const fetchProjectOptions = async () => { // Fetch project options
      try {
        const response = await fetch(`${BASE_URL}/api/viewprojects/`);
        if (!response.ok) {
          throw new Error("Failed to fetch project options");
        }
        const data = await response.json();
        setProjectOptions(data);
      } catch (error) {
        console.error("Error fetching project options:", error);
      }
    };

    fetchCrewOptions();
    fetchProjectOptions(); // Call fetch project options
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profile_photo: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        profile_photo: null,
      });
      setPreviewImage(null);
    }
  };

  const handleSelectChange = async (e) => {
    const { name, value, selectedOptions } = e.target;
    const selectedOption = selectedOptions[0];
    const selectedText = selectedOption.text;

    if (name === "company_id") {
      setFormData({
        ...formData,
        company_id: value,
      });

      try {
        const response = await fetch(
          `${BASE_URL}/api/viewcompanies/${value}/designations/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch designations");
        }
        const data = await response.json();
        setDesignationOptions(data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    } else if (name === "designation") {
      setFormData({
        ...formData,
        designation: selectedText,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAction = async (userId, action) => {
    if (action === 'reject') {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!"
      });
      if (!result.isConfirmed) {
        return;
      }
    }
    try {
      const response = await updateUserStatus(userId, action);
      console.log(`${action} response:`, response);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        if (action === 'accept') {
          
        } else if (action === 'reject') {
          
        }
      }
    } catch (error) {
      console.error(`Error ${action} user:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (formData.profile_photo !== null) {
      data.append("profile_photo", formData.profile_photo);
    }

    try {
      const response = await fetch(`${BASE_URL}/api/register-employees/`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Employee added:", result);

      // Display success message using SweetAlert2
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/result')
      // Call handleAction to accept the new user
      handleAction(result.id, "accept");
    } catch (error) {
      console.error("Error adding employee:", error);
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
    console.error('Error fetching notifications:', error);
  }
};

  return (
    <div>
       <Header notificationCount={notificationCount} />
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={3}>
            <label htmlFor="profiles" className="text-center position-relative">
              <input
                id="profiles"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img
                width={"50%"}
                height={"50%"}
                src={
                  previewImage ||
                  "https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                }
                className="rounded-image"
                alt="Profile Preview"
              />
              <FaEdit
                className="position-absolute bottom-0 end-0"
                style={{ cursor: "pointer" }}
              />
            </label>
          </Col>
          <Col xs={12} md={9}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3 first-field">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label> Gate Pass Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="gate_pass_no"
                      value={formData.gate_pass_no}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rig/Rigless</Form.Label>
                    <Form.Select
                      name="rig_or_rigless"
                      value={formData.rig_or_rigless}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Rig">Rig</option>
                      <option value="Rigless">Rigless</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Select
                      name="company_id"
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Company</option>
                      {crewOptions.map((crew) => (
                        <option key={crew.id} value={crew.id}>
                          {crew.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Select
                      name="project_id"
                      value={formData.project_id}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {projectOptions.map((project) => ( // Map over project options
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <button type="submit" className="btn btn-primary w-25">
                  Submit
                </button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddEmp;
