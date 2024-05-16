import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { profileSearch } from '../services/allApi';

function Home() {
  const [employeeName, setEmployeeName] = useState('');
  const [gatePassId, setGatePassId] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null); // Reset error state before search
     // Check if at least one field is filled
  if (!employeeName && !gatePassId && !designation && !company) {
    setError('Please fill at least one field.');
    return;
  }
    try {
      const data = {
        full_name: employeeName,
        gate_pass_no: gatePassId,
        designation: designation,
        company_name: company
      };

      const result = await profileSearch(data);
      console.log(result);

      if (result.length > 0) {
        // Assuming the API returns an array with at least one profile
        navigate(`/profile/${result[0].user}`);
      } else {
        setError('No profiles found.');
      }
    } catch (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div>
      <Header />
      <Container className='mt-5'>
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
              <Alert variant="danger">
                {error}
              </Alert>
            </Col>
          )}
          <Col xs={12} className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
