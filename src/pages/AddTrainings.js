import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { fetchNotifications } from '../services/allApi';

function AddTrainings() {
  const [mainTrainings, setMainTrainings] = useState([]);
  const [trainingName, setTrainingName] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');
  const [selectedMainTraining, setSelectedMainTraining] = useState('');
  const [mode, setMode] = useState('main'); // 'main' or 'sub'
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchMainTrainings();
    getNotificationCount();
  }, []);

  const fetchMainTrainings = async () => {
    try {
      const response = await axios.get('https://codeedexbackend.pythonanywhere.com/api/view-main-trainings/');
      setMainTrainings(response.data);
    } catch (error) {
      console.error('Error fetching main trainings:', error);
    }
  };

  const handleAddTraining = async () => {
    if (trainingName && (mode === 'main' || (mode === 'sub' && selectedMainTraining && validityPeriod))) {
      try {
        if (mode === 'main') {
          const response = await axios.post('https://codeedexbackend.pythonanywhere.com/api/main-trainings/', {
            name: trainingName,
          });
          setMainTrainings([...mainTrainings, response.data]);
        } else {
          const response = await axios.post('https://codeedexbackend.pythonanywhere.com/api/sub-trainings/', {
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
      setSelectedMainTraining(mainTrainingId); // Ensure to set the mainTrainingId
      setEditingIndex(index);
      setEditingId(training.id);
    }
  };

  const handleSaveEdit = async () => {
    try {
      if (mode === 'main') {
        await axios.put(`https://codeedexbackend.pythonanywhere.com/api/main-trainings/${editingId}/`, {
          name: trainingName,
        });
        const updatedMainTrainings = mainTrainings.map((mt, index) =>
          index === editingIndex ? { ...mt, name: trainingName } : mt
        );
        setMainTrainings(updatedMainTrainings);
      } else {
        const response = await axios.put(`https://codeedexbackend.pythonanywhere.com/api/sub-trainings/${editingId}/`, {
          name: trainingName,
          main_training: selectedMainTraining,
          validity_period: validityPeriod,
        });
        const updatedMainTrainings = mainTrainings.map(mt => {
          if (mt.id === selectedMainTraining) {
            const updatedSubTrainings = mt.sub_trainings.map((st, subIndex) =>
              st.id === editingId ? response.data : st
            );
            return { ...mt, sub_trainings: updatedSubTrainings };
          }
          return mt;
        });
        setMainTrainings(updatedMainTrainings);
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

  const handleDeleteTraining = async (id, type, mainTrainingId) => {
    try {
      if (type === 'main') {
        await axios.delete(`https://codeedexbackend.pythonanywhere.com/api/main-trainings/${id}/`);
        setMainTrainings(mainTrainings.filter(mt => mt.id !== id));
      } else {
        await axios.delete(`https://codeedexbackend.pythonanywhere.com/api/sub-trainings/${id}/`);
        const updatedMainTrainings = mainTrainings.map(mt => {
          if (mt.id === mainTrainingId) {
            const updatedSubTrainings = mt.sub_trainings.filter(st => st.id !== id);
            return { ...mt, sub_trainings: updatedSubTrainings };
          }
          return mt;
        });
        setMainTrainings(updatedMainTrainings);
      }
    } catch (error) {
      console.error(`Error deleting ${type} training:`, error);
    }
  };

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
      <div style={styles.container}>
        <h1 style={styles.header}>Training Manager</h1>
        <div style={styles.modeSelect}>
          <select value={mode} onChange={e => setMode(e.target.value)} style={styles.select}>
            <option value="main">Main Training</option>
            <option value="sub">Sub Training</option>
          </select>
        </div>
        <div style={styles.form}>
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
            <input
              type="text"
              value={validityPeriod}
              onChange={e => setValidityPeriod(e.target.value)}
              placeholder="Enter validity period"
              style={styles.input}
            />
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
                <button onClick={() => handleDeleteTraining(mainTraining.id, 'main')} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
              {mainTraining.sub_trainings && mainTraining.sub_trainings.length > 0 && (
                <div style={styles.subTrainingList}>
                  {mainTraining.sub_trainings.map((subTraining, subIndex) => (
                    <div key={subTraining.id} style={styles.subTrainingItem}>
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
                          onClick={() => handleDeleteTraining(subTraining.id, 'sub', mainTraining.id)}
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
    backgroundColor: '#FFC107',
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
export default AddTrainings;