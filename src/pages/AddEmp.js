import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';

function AddEmp() {
  return (
    <div>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={3}>
          <label htmlFor="profiles" className="text-center">
                <input id="profiles" type="file" style={{ display: "none" }} />
                <img
                  width={"50%"}
                  height={"50%"}
                  src="https://i.postimg.cc/fb2QkK8K/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                  className=""
                  alt=""
                />
              </label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Group className="mb-3 first-field">
              <Form.Label> Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            
            <Row>
            <Col xs={12} sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>GLT Gate Pass Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            </Col>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rig/Rigless</Form.Label>
                  <Form.Select>
                    <option value="rig">Rig</option>
                    <option value="rigless">Rigless</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crew</Form.Label>
                  <Form.Select>
                    <option value="crew1">Crew 1</option>
                    <option value="crew2">Crew 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select>
                    <option value="designation1">Designation 1</option>
                    <option value="designation2">Designation 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
              <Col xs={12} sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
             <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
             </Col>
            </Row>
            
            <Col xs={12}>
              <button  variant="primary" className="btn btn-primary w-25">Submit</button>
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddEmp;
