import { Badge } from '@mui/material';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header({ notificationCount }) {
    const handleLogout=()=>{
        localStorage.removeItem("ido")
        window.location.reload();
    }
    return (
        <div>
            <Navbar expand="lg" style={{ backgroundColor: "blue" }}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className='ms-3' to={'/'} style={{ textDecoration: "none", color: "white", padding: "15px", fontSize: "16px" }}>
                                <i className="fa-solid fa-house fs-4"></i>
                            </Link>
                            <Link className='ms-3' to={'/request'} style={{ textDecoration: "none", color: "white", padding: "15px", fontSize: "16px" }}>
                                Employee Request
                            </Link>
                            <Link className='ms-3' to={'/result'} style={{ textDecoration: "none", color: "white", padding: "15px", fontSize: "16px" }}>
                                Employee Profile
                            </Link>
                            <Link className='ms-3' to={'/add'} style={{ textDecoration: "none", color: "white", padding: "15px", fontSize: "16px" }}>
                                Add Employee
                            </Link>
                            <Link className='ms-3' to={'/remove'} style={{ textDecoration: "none", color: "white", padding: "15px", fontSize: "16px" }}>
                                Remove Employee
                            </Link>
                        </Nav>
                        <Form className="d-flex align-items-center">
                            <Link to={'/notifications'} className='me-5' style={{ textDecoration: "none", color: "white", fontSize: "18px", fontWeight: 600 }}>
                                <Badge badgeContent={notificationCount} color="warning">
                                    <FaBell />
                                </Badge>
                            </Link>
                            <NavDropdown className='text-white' style={{ marginRight: "70px" }} title="SLB Admin" id="basic-nav-dropdown">
                                <Link to={'/addcompany'} style={{ textDecoration: "none" }}>
                                    <NavDropdown.Item href="#action/3.1">Edit Comapny</NavDropdown.Item>
                                </Link>
                                <Link style={{ textDecoration: "none" }} to={'/addproject'}>
                                    <NavDropdown.Item href="#action/3.2">
                                        Edit Project
                                    </NavDropdown.Item>
                                </Link>
                                <Link style={{ textDecoration: "none" }} to={'/addtrainings'}>
                                    <NavDropdown.Item href="#action/3.2">
                                        Edit Trainings
                                    </NavDropdown.Item>
                                </Link>
                                <NavDropdown.Divider />
                                <Link to={'/login'}>
                                    <NavDropdown.Item href="#action/3.4">
                                        Login
                                    </NavDropdown.Item>
                                </Link>
                                <Link onClick={handleLogout}>
                                    <NavDropdown.Item href="#action/3.4">
                                        Logout
                                    </NavDropdown.Item>
                                </Link>
                            </NavDropdown>                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default Header;