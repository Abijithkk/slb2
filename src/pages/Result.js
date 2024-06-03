import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Avatar, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Header from "../components/Header";
import { approvedusers, fetchNotifications } from "../services/allApi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import './Result.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/baseUrl";

function Result() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [OTCData, setOTCData] = useState({});
  const [overallOTC, setOverallOTC] = useState("");
  const [filter, setFilter] = useState("all");
  const [subTrainingNames, setSubTrainingNames] = useState({});
  const [subTrainings, setSubTrainings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await approvedusers();
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
        const promises = users.map(async (user) => {
          const response = await axios.get(`${BASE_URL}/api/employeetrainingpercentage/${user.id}/`);
          return { id: user.id, otc: response.data };
        });

        const otcDataArray = await Promise.all(promises);
        const otcData = {};
        otcDataArray.forEach((item) => {
          otcData[item.id] = item.otc;
        });

        setOTCData(otcData);
        calculateOverallOTC(filteredUsers(users, searchQuery, filter), otcData);
      } catch (error) {
        console.error("Error fetching OTC data:", error);
      }
    };

    if (users.length > 0) {
      fetchOTCData();
    }
  }, [users]);

  useEffect(() => {
    calculateOverallOTC(filteredUsers(users, searchQuery, filter), OTCData);
  }, [filter, searchQuery, OTCData]);

  useEffect(() => {
    const fetchSubTrainingNames = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/subtrainings/`);
        const subTrainingNames = {};
        response.data.forEach((item) => {
          subTrainingNames[item.id] = item.name;
        });
        setSubTrainingNames(subTrainingNames);
      } catch (error) {
        console.error("Error fetching sub-training names:", error);
      }
    };

    const fetchSubTrainings = async () => {
      try {
        const promises = users.map(async (user) => {
          const response = await axios.get(`${BASE_URL}/api/employees/${user.id}/sub-trainings/`);
        
          return { id: user.id, subTrainings: response.data };
        });

        const subTrainingsArray = await Promise.all(promises);
        const subTrainingsData = {};
        subTrainingsArray.forEach((item) => {
          subTrainingsData[item.id] = item.subTrainings;
        });

        setSubTrainings(subTrainingsData);
      } catch (error) {
        console.error("Error fetching sub-trainings:", error);
      }
    };

    if (users.length > 0) {
      fetchSubTrainingNames();
      fetchSubTrainings();
    }
  }, [users]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const calculateOverallOTC = (filteredUsersList, otcData) => {
    const overallPercentage = filteredUsersList.reduce((acc, user) => {
      const otc = otcData[user.id] || [];
      if (otc.length === 0) return acc;
      const userOverallOTC = otc.reduce((acc, training) => acc + training.completion_percentage, 0) / otc.length;
      return acc + userOverallOTC;
    }, 0) / filteredUsersList.length;

    setOverallOTC(overallPercentage.toFixed(2));
  };

  const filteredUsers = (usersList, query, filter) => {
    return usersList.filter((user) => {
      const fullName = user.fullname || "";
      const designation = user.designation || "";
      const projectName = user.project.name || "";
      const gatePassNo = user.gate_pass_no || "";
      const companyName = user.company.name || "";
      const matchesSearchQuery = (
        fullName.toLowerCase().includes(query.toLowerCase()) ||
        designation.toLowerCase().includes(query.toLowerCase()) ||
        projectName.toLowerCase().includes(query.toLowerCase()) ||
        gatePassNo.toLowerCase().includes(query.toLowerCase()) ||
        companyName.toLowerCase().includes(query.toLowerCase())
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
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'long' })}-${date.getFullYear()}`;
    const imageUrl = 'https://i.postimg.cc/sDyDS61w/download-2-1.png';
    const otc = overallOTC;
  
    doc.addImage(imageUrl, 'PNG', 250, 2, 20, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    const headerText = `Training Matrix : ${formattedDate}    OTC : ${otc}%`;
    doc.text(headerText, 75, 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  
    const columnWidths = {
      0: 40,
      1: 30,
      2: 30,
      3: 30,
      4: 40,
      5: 20,
      6: 25,
      7: 80,
    };
  
    doc.autoTable({
      head: [
        [
          { content: "Employee Name", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "Designation", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "Project", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "Gate Pass No.", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "Company Name", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "OTC", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "On Duty / Off Duty", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
          { content: "Sub-Trainings", styles: { fillColor: [51, 122, 183], textColor: [255, 255, 255] } },
        ],
      ],
      body: filteredUsers(users, searchQuery, filter).map((user) => [
        user.fullname,
        user.designation,
        user.project.name,
        user.gate_pass_no,
        user.company.name,
        calculateOTC(user.id),
        user.on_duty ? "On duty" : "Off duty",
        getSubTrainings(user.id).replace(/<br\/>/g, "\n"),
      ]),
      startY: 20,
      columnStyles: columnWidths,
      theme: 'grid',
      margin: { top: 20 },
    });
  
    doc.save("user_data.pdf");
  };

  const calculateOTC = (userId) => {
    const otc = OTCData[userId] || [];
    if (otc.length === 0) return "0%";
    const overallPercentage = otc.reduce((acc, training) => acc + training.completion_percentage, 0) / otc.length;
    return `${overallPercentage.toFixed(2)}%`;
  };
  const getSubTrainings = (userId) => {
    const subTrainingsForUser = subTrainings[userId] || [];
    const subTrainingNamesForUser = subTrainingsForUser.map(training => {
      const subTrainingName = subTrainingNames[training.sub_training];
      const endDate = training.expiration_date ? training.expiration_date : "Permanent";
  
      if (!subTrainingName) {
        return `${training.main_training_name} <br/> {${training.sub_training_name} <br/> End Date: ${endDate}<br/> Status: ${training.completion_percentage}% } `;
      }
      return `${subTrainingName}:<br/> Completion Percentage: ${training.completion_percentage}%`;
    });
  
    return subTrainingNamesForUser.join(',<br/><br/>');
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
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.
            s1.04-.73.53-.22.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
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
      <h5 className="text-end otc"> <b>Overall Training Coefficient (OTC) : {overallOTC}%</b></h5>
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
                <th style={{ fontWeight: "500",width:'105px' }}>On Duty / Off Duty</th>
                <th style={{ fontWeight: "500" }}>Sub-Trainings</th>
                <th style={{ fontWeight: "500" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers(users, searchQuery, filter).map((user, index) => (
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
                  <td className="pt-3">{user.designation}</td>
                  <td className="pt-3">{user.project.name}</td>
                  <td className="pt-3">{user.gate_pass_no}</td>
                  <td className="pt-3">{user.company.name}</td>
                  <td className="pt-3">{calculateOTC(user.id)}</td>
                  <td className="pt-3">
                    {user.on_duty ? "On Duty" : "Off Duty"}
                    <i className={`fa-solid fa-circle ms-1 ${user.on_duty ? 'green-circle' : 'red-circle'}`}></i>
                  </td>
                  <td className="pt-3"  dangerouslySetInnerHTML={{ __html: getSubTrainings(user.id) }}></td>
                  <td className="pt-3">
                    <Button
                      variant="primary"
                      onClick={() => handleUpdateProfile(user.id)}
                    >
                      Update Profile
                    </Button>
                  </td>
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

 
