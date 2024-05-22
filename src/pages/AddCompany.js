import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { fetchNotifications } from '../services/allApi';


function AddCompany() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://codeedexbackend.pythonanywhere.com/api/viewcompanies/');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };
  const handleAddCompany = async () => {
    if (companyName) {
      try {
        const response = await axios.post('https://codeedexbackend.pythonanywhere.com/api/create-companies/', {
          name: companyName,
        });
        setCompanies([...companies, response.data]);
        setCompanyName('');
      } catch (error) {
        console.error('Error adding company:', error);
      }
    }
  };
  const handleEditCompany = index => {
    setCompanyName(companies[index].name);
    setEditingIndex(index);
    setEditingId(companies[index].id);
  };
  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://codeedexbackend.pythonanywhere.com/api/companies/${editingId}/`, {
        name: companyName,
      });
      const updatedCompanies = companies.map((company, index) =>
        index === editingIndex ? { ...company, name: companyName } : company
      );
      setCompanies(updatedCompanies);
      setCompanyName('');
      setEditingIndex(null);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };
  const handleDeleteCompany = async id => {
    try {
      await axios.delete(`https://codeedexbackend.pythonanywhere.com/api/companies/${id}/`);
      setCompanies(companies.filter(company => company.id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
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
        <Header notificationCount={notificationCount} ></Header>
        <div style={styles.app}>
          <h1 style={styles.header}>Edit Company</h1>
          <div style={styles.projectForm}>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              style={styles.input}
            />
            {editingIndex !== null ? (
              <button onClick={handleSaveEdit} style={{ ...styles.button, ...styles.saveButton }}>
                Save Edit
              </button>
            ) : (
              <button onClick={handleAddCompany} style={{ ...styles.button, ...styles.addButton }}>
                Add Company
              </button>
            )}
          </div>
          <div style={styles.projectList}>
            {companies.map((company, index) => (
              <div key={company.id} style={styles.projectItem}>
                <span style={styles.projectName}>{company.name}</span>
                <button
                  onClick={() => handleEditCompany(index)}
                  style={{ ...styles.button, ...styles.editButton }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  style={{ ...styles.button, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '700px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    background: '#FFFFFF',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#444',
  },
  projectForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  input: {
    flexGrow: 1,
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    marginRight: '15px',
    fontSize: '16px',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  },
  addButton: {
    backgroundColor: '#28A745',
  },
  saveButton: {
    backgroundColor: '#17A2B8',
  },
  editButton: {
    backgroundColor: '#FFC107',
    marginLeft: '10px',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    marginLeft: '10px',
  },
  projectList: {
    listStyle: 'none',
    padding: 0,
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px',
    background: '#F8F9FA',
  },
  projectName: {
    flexGrow: 1,
    fontSize: '18px',
    color: '#333',
  },
};
export default AddCompany;




