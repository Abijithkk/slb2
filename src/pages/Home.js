import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications, profileSearch } from '../services/allApi';

function Home() {
  const [employeeName, setEmployeeName] = useState('');
  const [gatePassId, setGatePassId] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null);
    if (!employeeName && !gatePassId && !designation && !company) {
      setError('Please fill at least one field.');
      return;
    }

    const data = {
      fullname: employeeName,
      gate_pass_no: gatePassId,
      designation_name: designation,
      company_name: company,
    };

    try {
      const result = await profileSearch(data);
      console.log('Search Result:', result); // Log the search result
      if (result.length > 0) {
        navigate(`/profile/${result[0].id}`);
        sessionStorage.setItem('userid', result[0].id);
      } else {
        setError('No profiles found.');
      }
    } catch (errorMessage) {
      setError(errorMessage.message || 'An error occurred during the search.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };


  //Notification count 
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
          <Col xs={12}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gate Pass ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={gatePassId}
                      onChange={(e) => setGatePassId(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                {error && (
                  <Col xs={12}>
                    <Alert variant="danger">{error}</Alert>
                  </Col>
                )}
                <Col xs={12} className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
