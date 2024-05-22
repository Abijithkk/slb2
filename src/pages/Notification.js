import React, { useState, useEffect } from 'react';
import './Notification.css';
import Header from '../components/Header';
import { fetchNotifications, deleteNotification } from '../services/allApi'; // Assuming you have a deleteNotification function
import { useHistory, useNavigate } from 'react-router-dom';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

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

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const data = await fetchNotifications();
      const formattedNotifications = data.map(notification => ({
        ...notification,
        created_at: formatDateTime(notification.created_at)
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter(notification => notification.id !== id));
      setNotificationCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = async (id) => {
    await handleDeleteNotification(id);
    navigate('/request');
  };

  return (
    <div>
      <Header notificationCount={notificationCount} />
      <section className="section-50">
        <div className="container">
          <h3 className="m-b-50 heading-line">
            Notifications <i className="fa fa-bell text-muted"></i>
          </h3>
          <div className="notification-ui_dd-content">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className="notification-list notification-list--unread">
                  <div className="notification-list_content">
                    <div className="notification-list_img">
                      <img src="https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg" alt="user"/>
                    </div>
                    <div className="notification-list_detail">
                      <p
                        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <b>{notification.message}</b>
                      </p>
                      <p className="text-muted">{notification.created_at}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No notifications found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notification;
