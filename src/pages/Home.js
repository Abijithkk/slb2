import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function Home() {
    return (

        <div>
            <Header></Header>
            <Container className='mt-5'>
                <Row>
                    <Col xs={12} sm={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gate Pass ID</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="email"  />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="tel"  />
                        </Form.Group>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
<Link to={'/result'}>
                            <Button variant="primary">Search</Button>
    
</Link>                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
