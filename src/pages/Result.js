import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Avatar, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Header from "../components/Header";
import { approvedusers, fetchNotifications } from "../services/allApi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './Result.css';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";

function Result() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [OTCData, setOTCData] = useState({}); // State to store OTC data for each employee
  const [overallOTC, setOverallOTC] = useState(""); // State to store overall OTC for all users
  const [filter, setFilter] = useState("all"); // State to manage the selected radio button value
  const navigate=useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await approvedusers();
        console.log("Response:", response);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOTCData = async () => {
      try {
        // Fetch OTC data for each employee
        const promises = users.map(async (user) => {
          const response = await axios.get(`https://codeedexbackend.pythonanywhere.com/api/employeetrainingpercentage/${user.id}/`);
          return { id: user.id, otc: response.data }; // Store the OTC data along with user ID
        });
        const otcDataArray = await Promise.all(promises);
        const otcData = {};
        otcDataArray.forEach((item) => {
          otcData[item.id] = item.otc;
        });
        setOTCData(otcData);

        // Calculate overall OTC for all users initially
        calculateOverallOTC(users, otcData, filter);
      } catch (error) {
        console.error("Error fetching OTC data:", error);
      }
    };

    if (users.length > 0) {
      fetchOTCData();
    }
  }, [users]);

  useEffect(() => {
    // Recalculate overall OTC whenever the filter changes
    calculateOverallOTC(filteredUsers, OTCData, filter);
  }, [filter, OTCData]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const calculateOverallOTC = (usersList, otcData, filter) => {
    const filteredUsersList = usersList.filter((user) => {
      if (filter === "all") {
        return true;
      } else if (filter === "OnDuty") {
        return user.on_duty;
      } else if (filter === "OffDuty") {
        return !user.on_duty;
      }
      return true;
    });

    const overallPercentage = filteredUsersList.reduce((acc, user) => {
      const otc = otcData[user.id] || [];
      if (otc.length === 0) return acc;
      const userOverallOTC = otc.reduce((acc, training) => acc + training.completion_percentage, 0) / otc.length;
      return acc + userOverallOTC;
    }, 0) / filteredUsersList.length;

    setOverallOTC(overallPercentage.toFixed(2));
  };

  // Filter users based on search query and filter value
  const filteredUsers = users.filter((user) => {
    const fullName = user.fullname || "";
    const designation = user.designation || "";
    const projectName = user.project.name || "";
    const gatePassNo = user.gate_pass_no || "";
    const companyName = user.company.name || "";
    const matchesSearchQuery = (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gatePassNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === "all") {
      return matchesSearchQuery;
    } else if (filter === "OnDuty") {
      return matchesSearchQuery && user.on_duty;
    } else if (filter === "OffDuty") {
      return matchesSearchQuery && !user.on_duty;
    }

    return matchesSearchQuery;
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    const date = new Date();
    const formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
    const imageUrl = 'https://i.postimg.cc/sDyDS61w/download-2-1.png';
  
    // Add the image to the PDF
    doc.addImage(imageUrl, 'PNG', 170, -3, 20, 20); // Adjust coordinates to move the image
  
    doc.text(`Training Matrix - ${formattedDate}`, 20, 10);
    doc.autoTable({
      head: [
        [
          "Employee Name",
          "Designation",
          "Project",
          "Gate Pass No.",
          "Company Name",
          "OTC",
          "On Duty / Off Duty",
        ],
      ],
      body: filteredUsers.map((user) => [
        user.fullname,
        user.designation,
        user.project.name,
        user.gate_pass_no,
        user.company.name,
        calculateOTC(user.id), // Pass user ID to calculate OTC function
        user.on_duty ? "On duty" : "Off duty",
      ]),
    });
    doc.save("user_data.pdf");
};


  // Function to calculate OTC for a user
  const calculateOTC = (userId) => {
    const otc = OTCData[userId] || []; // Get OTC data for the user
    if (otc.length === 0) return "0%"; // Return "0%" if no OTC data found
    // Calculate overall completion percentage
    const overallPercentage = otc.reduce((acc, training) => acc + training.completion_percentage, 0) / otc.length;
    return `${overallPercentage.toFixed(2)}%`; // Format OTC percentage
  };

  const handleUpdateProfile = (id) => {
    sessionStorage.setItem('userid', id);
    navigate(`/profile/${id}`);
  };

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
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Type your text"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
        <FormControl className="ms-5">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={filter}
            onChange={handleFilterChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="OnDuty" control={<Radio />} label="On Duty" />
            <FormControlLabel value="OffDuty" control={<Radio />} label="Off Duty" />
          </RadioGroup>
        </FormControl>
      </div>

      <h6 className="text-end otc"> OTC : {overallOTC}%</h6>
      <Button className="pdfbtn" variant="secondary" onClick={handleDownload}>
        Download <i className="fa-solid fa-file-pdf"></i>
      </Button>

      <center>
        <div id="pdf-content">
          <Table style={{ backgroundColor: "white", width: "90%", borderTop: "1px solid #D4D4D4" }}>
            <thead>
              <tr>
                <th style={{ fontWeight: "500" }}>Employee Name</th>
                <th style={{ fontWeight: "500" }}>Designation</th>
                <th style={{ fontWeight: "500" }}>Project</th>
                <th style={{ fontWeight: "500" }}>Gate Pass No.</th>
                <th style={{ fontWeight: "500" }}>Company Name</th>
                <th style={{ fontWeight: "500" }}>OTC</th>
                <th style={{ fontWeight: "500" }}>On Duty / Off Duty</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={user.profile_photo || "https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"}
                        sx={{ mr: 2 }}
                      />
                      {user.fullname}
                    </div>
                  </td>
                  <td>{user.designation}</td>
                  <td>{user.project.name}</td>
                  <td>{user.gate_pass_no}</td>
                  <td>{user.company.name}</td>
                  <td>{calculateOTC(user.id)}</td> 
                  <td>
                    {user.on_duty ? "On Duty" : "Off Duty"}
                    <i className={`fa-solid fa-circle ms-1 ${user.on_duty ? 'green-circle' : 'red-circle'}`}></i>
                  </td>
                  <td>
                  <Button variant="primary" onClick={() => handleUpdateProfile(user.id)}>Update Profile</Button>                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </center>
    </div>
  );
}

export default Result;
