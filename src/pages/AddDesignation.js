import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { fetchNotifications } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function AddDesignation() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/alldesignations/`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProject = async () => {
    if (projectName) {
      try {
        const response = await axios.post(`${BASE_URL}/api/designations/`, {
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
      await axios.put(`${BASE_URL}/api/designations/${editingId}/`, {
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

  const handleDeleteProject = id => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/designations/${projectToDelete}/`);
      setProjects(projects.filter(project => project.id !== projectToDelete));
      setShowDeleteModal(false);
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
        <h1 style={styles.header}>Edit Designation</h1>
        <div style={styles.projectForm}>
          <input
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Enter Designation name"
            style={styles.input}
          />
          {editingIndex !== null ? (
            <button onClick={handleSaveEdit} style={styles.button}>
              Save Edit
            </button>
          ) : (
            <button onClick={handleAddProject} style={styles.button}>
              Add Designation
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

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this designation?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
};

export default AddDesignation;
