import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>

            <Navbar expand="lg" style={{ backgroundColor:"blue" }}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className='ms-3' to={'/'} style={{ textDecoration: "none",color: "white", padding: "15px", fontSize: "16px" }}>
                            <i class="fa-solid fa-house fs-4"></i>
                            </Link>
                            <Link className='ms-3' to={'/request'} style={{ textDecoration: "none",color: "white", padding: "15px", fontSize: "16px" }}>
                                Employee Request
                            </Link>
                            <Link className='ms-3' to={'/result'} style={{ textDecoration: "none",color: "white", padding: "15px", fontSize: "16px" }}>
                                Employee Profile
                            </Link>
                            <Link className='ms-3' to={'/add'} style={{ textDecoration: "none",color: "white", padding: "15px", fontSize: "16px" }}>
                                Add Employee
                            </Link>
                            <Link className='ms-3' to={'/remove'} style={{ textDecoration: "none",color: "white", padding: "15px", fontSize: "16px" }}>
                                Remove Employee
                            </Link>
                            
                        </Nav>
                        <Form className="d-flex">
                            <Link className='me-4' style={{ textDecoration: "none", color: "white", fontSize: "18px", fontWeight: 600 }}>SLB Admin  <FaRegUserCircle /></Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header