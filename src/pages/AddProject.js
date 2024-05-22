import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { fetchNotifications } from '../services/allApi';


function AddProject() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://codeedexbackend.pythonanywhere.com/api/viewprojects/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  const handleAddProject = async () => {
    if (projectName) {
      try {
        const response = await axios.post('https://codeedexbackend.pythonanywhere.com/api/create-project/', {
          name: projectName,
        });
        setProjects([...projects, response.data]);
        setProjectName('');
      } catch (error) {
        console.error('Error adding project:', error);
      }
    }
  };
  const handleEditProject = index => {
    setProjectName(projects[index].name);
    setEditingIndex(index);
    setEditingId(projects[index].id);
  };
  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://codeedexbackend.pythonanywhere.com/api/updateprojects/${editingId}/`, {
        name: projectName,
      });
      const updatedProjects = projects.map((project, index) =>
        index === editingIndex ? { ...project, name: projectName } : project
      );
      setProjects(updatedProjects);
      setProjectName('');
      setEditingIndex(null);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  const handleDeleteProject = async id => {
    try {
      await axios.delete(`https://codeedexbackend.pythonanywhere.com/api/delprojects/${id}/`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
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
        <div style={styles.app}>
          <h1 style={styles.header}>Edit Project</h1>
          <div style={styles.projectForm}>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="Enter project name"
              style={styles.input}
            />
            {editingIndex !== null ? (
              <button onClick={handleSaveEdit} style={styles.button}>
                Save Edit
              </button>
            ) : (
              <button onClick={handleAddProject} style={styles.button}>
                Add Project
              </button>
            )}
          </div>
          <div style={styles.projectList}>
            {projects.map((project, index) => (
              <div key={project.id} style={styles.projectItem}>
                <span style={styles.projectName}>{project.name}</span>
                <button
                  onClick={() => handleEditProject(index)}
                  style={{ ...styles.button, ...styles.editButton }}
                >
                  Edit
                </button>
                <button className='ms-2'
                  onClick={() => handleDeleteProject(project.id)}
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
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    background: '#F9F9F9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  projectForm: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  projectList: {
    listStyle: 'none',
    padding: 0,
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    background: '#fff',
  },
  projectName: {
    flexGrow: 1,
  },
  editButton: {
    backgroundColor: '#FFC107',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  'button:hover': {
    backgroundColor: '#0056B3',
  },
  'editButton:hover': {
    backgroundColor: '#E0A800',
  },
  'deleteButton:hover': {
    backgroundColor: '#C82333',
  },
};
export default AddProject;