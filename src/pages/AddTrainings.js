import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { BASE_URL } from '../services/baseUrl';

Modal.setAppElement('#root'); 

function AddTrainings() {
  const [mainTrainings, setMainTrainings] = useState([]);
  const [trainingName, setTrainingName] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');
  const [selectedMainTraining, setSelectedMainTraining] = useState('');
  const [mode, setMode] = useState('main'); // 'main' or 'sub'
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: null, type: '', mainTrainingId: null });

  const formRef = useRef(null);

  useEffect(() => {
    fetchMainTrainings();
  }, []);

  const fetchMainTrainings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/view-main-trainings/`);
      setMainTrainings(response.data);
    } catch (error) {
      console.error('Error fetching main trainings:', error);
    }
  };

  const showToast = (message, type) => {
    toast(message);
  };

  const handleAddTraining = async () => {
    if (trainingName && (mode === 'main' || (mode === 'sub' && selectedMainTraining && validityPeriod))) {
      try {
        if (mode === 'main') {
          const response = await axios.post(`${BASE_URL}/api/main-trainings/`, {
            name: trainingName,
          });
          setMainTrainings([...mainTrainings, { ...response.data, sub_trainings: [] }]);
          showToast('Training added successfully!', 'success');
        } else {
          const response = await axios.post(`'${BASE_URL}/api/sub-trainings/`, {
            name: trainingName,
            main_training: selectedMainTraining,
            validity_period: validityPeriod,
          });
          const updatedMainTrainings = mainTrainings.map(mt => {
            if (mt.id === selectedMainTraining) {
              return { ...mt, sub_trainings: [...mt.sub_trainings, response.data] };
            }
            return mt;
          });
          setMainTrainings(updatedMainTrainings);
          showToast('Sub-training added successfully!', 'success');
        }
        setTrainingName('');
        setValidityPeriod('');
        setSelectedMainTraining('');
      } catch (error) {
        console.error(`Error adding ${mode} training:`, error);
      }
    }
  };

  const handleEditTraining = (index, training, type, mainTrainingId) => {
    setTrainingName(training.name);
    if (type === 'main') {
      setMode('main');
      setEditingIndex(index);
      setEditingId(training.id);
    } else {
      setMode('sub');
      setValidityPeriod(training.validity_period);
      setSelectedMainTraining(mainTrainingId); 
      setEditingIndex(index);
      setEditingId(training.subtraining_id); 
    }
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveEdit = async () => {
    try {
      if (mode === 'main') {
        await axios.put(`${BASE_URL}/api/main-trainings/${editingId}/`, {
          name: trainingName,
        });
        console.log(editingId);
        const updatedMainTrainings = mainTrainings.map((mt, index) =>
          index === editingIndex ? { ...mt, name: trainingName } : mt
        );
        setMainTrainings(updatedMainTrainings);
        showToast('Training updated successfully!', 'success');
      } else {
        const response = await axios.put(`${BASE_URL}/api/sub-trainings/${editingId}/`, {
          subtraining_id: editingId, // Include subtraining_id in the request payload
          name: trainingName,
          main_training: selectedMainTraining,
          validity_period: validityPeriod,
        });
        console.log(validityPeriod);
        console.log(editingId);
        const updatedMainTrainings = mainTrainings.map(mt => {
          if (mt.id === selectedMainTraining) {
            const updatedSubTrainings = mt.sub_trainings.map((st) =>
              st.subtraining_id === editingId ? response.data : st
            );
            return { ...mt, sub_trainings: updatedSubTrainings };
          }
          return mt;
        });
        setMainTrainings(updatedMainTrainings);
        showToast('Sub-training updated successfully!', 'success');
      }
      setTrainingName('');
      setValidityPeriod('');
      setSelectedMainTraining('');
      setEditingIndex(null);
      setEditingId(null);
    } catch (error) {
      console.error(`Error updating ${mode} training:`, error);
    }
  };

  const openDeleteModal = (id, type, mainTrainingId = null) => {
    setDeleteData({ id, type, mainTrainingId });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const { id, type, mainTrainingId } = deleteData;
    try {
      if (type === 'main') {
        await axios.delete(`${BASE_URL}/api/main-trainings/${id}/`);
        setMainTrainings(mainTrainings.filter(mt => mt.id !== id));
      } else {
        await axios.delete(`${BASE_URL}/api/sub-trainings/${id}/`);
        const updatedMainTrainings = mainTrainings.map(mt => {
          if (mt.id === mainTrainingId) {
            const updatedSubTrainings = mt.sub_trainings.filter(st => st.subtraining_id !== id); // Use subtraining_id
            return { ...mt, sub_trainings: updatedSubTrainings };
          }
          return mt;
        });
        setMainTrainings(updatedMainTrainings);
        showToast('Sub-training deleted successfully!', 'success');
      }
      showToast('Training deleted successfully!', 'success');
    } catch (error) {
      console.error(`Error deleting ${type} training:`, error);
      showToast('Error deleting training!', 'error');
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header notificationCount={notificationCount} />
      <div style={styles.container}>
        <h1 style={styles.header}>Training Manager</h1>
        <div style={styles.modeSelect}>
          <select value={mode} onChange={e => setMode(e.target.value)} style={styles.select}>
            <option value="main">Main Training</option>
            <option value="sub">Sub Training</option>
          </select>
        </div>
        <div ref={formRef} style={styles.form}>
          {mode === 'sub' && (
            <select
              value={selectedMainTraining}
              onChange={e => setSelectedMainTraining(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Main Training</option>
              {mainTrainings.map(mt => (
                <option key={mt.id} value={mt.id}>
                  {mt.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={trainingName}
            onChange={e => setTrainingName(e.target.value)}
            placeholder="Enter training name"
            style={styles.input}
          />
          {mode === 'sub' && (
            <select
              value={validityPeriod}
              onChange={e => setValidityPeriod(e.target.value)}
              style={styles.input}
            >
              <option value="">Select Validity Period</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="5 years">5 years</option>
              <option value="Permanent">Permanent</option>
            </select>
          )}
          {editingIndex !== null ? (
            <button onClick={handleSaveEdit} style={styles.saveButton}>
              Save Edit
            </button>
          ) : (
            <button onClick={handleAddTraining} style={styles.addButton}>
              Add Training
            </button>
          )}
        </div>
        <div style={styles.trainingList}>
          {mainTrainings.map((mainTraining, index) => (
            <div key={mainTraining.id} style={styles.trainingItem}>
              <span style={styles.trainingName}>{mainTraining.name}</span>
              <div>
                <button onClick={() => handleEditTraining(index, mainTraining, 'main')} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => openDeleteModal(mainTraining.id, 'main')} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
              {(mainTraining.sub_trainings || []).map((subTraining, subIndex) => (
                <div key={subTraining.subtraining_id} style={styles.subTrainingItem}>
                  <span style={styles.subTrainingName}>
                    {subTraining.name} (Valid: {subTraining.validity_period})
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditTraining(subIndex, subTraining, 'sub', mainTraining.id)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(subTraining.subtraining_id, 'sub', mainTraining.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Confirm Delete"
        style={modalStyles}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this training?</p>
        <button onClick={handleConfirmDelete} style={styles.deleteButton}>Confirm</button>
        <button onClick={handleCancelDelete} style={styles.cancelButton}>Cancel</button>
      </Modal>
      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
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
  modeSelect: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
  },
  input: {
    width: '80%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '16px',
  },
  select: {
    width: '80%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#555',
    outline: 'none',
  },
  addButton: {
    backgroundColor: '#28A745',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  },
  saveButton: {
    backgroundColor: '#17A2B8',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
  },
  editButton: {
    backgroundColor: 'blue',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: '#6C757D',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '14px',
    marginLeft: '5px',
  },
  trainingList: {
    listStyle: 'none',
    padding: 0,
  },
  trainingItem: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px',
    background: '#F8F9FA',
  },
  trainingName: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  subTrainingList: {
    marginLeft: '20px',
    marginTop: '10px',
  },
  subTrainingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    background: '#E9ECEF',
  },
  subTrainingName: {
    fontSize: '16px',
    color: '#333',
  },
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '400px',
    maxWidth: '80%',
    textAlign: 'center',
  },
};

export default AddTrainings;
