import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { removeUser, deleteUser, fetchNotifications } from "../services/allApi";
import Header from "../components/Header";
import "./EmpReq.css"; // Create and import a CSS file for custom styles

function EmpRemove() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users to display per page
    const [loading, setLoading] = useState(true);

    const profileCardStyle = {
        padding: "20px",
        borderBottom: "1px solid black",
    };

    const rowStyle = {
        marginBottom: "10px",
    };

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await removeUser();
                console.log("Fetched users:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        console.log("User ID to delete:", userId); // Debugging step
        if (!userId) {
            console.error("User ID is undefined or null");
            Swal.fire(
                'Error!',
                'User ID is invalid.',
                'error'
            );
            return;
        }

        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deleteResponse = await deleteUser(userId);
                console.log("Delete Response:", deleteResponse); // Log the delete response
                Swal.fire(
                    'Deleted!',
                    'The user has been deleted.',
                    'success'
                ).then(() => {
                    window.location.reload(); // Refresh the page after deletion
                });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire(
                'Error!',
                'There was an error deleting the user.',
                'error'
            );
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div>
            <Header notificationCount={notificationCount} />
            <div className="container mt-5">
                {currentUsers.map((user, index) => (
                    <div key={user.id || index} className="profile-card" style={profileCardStyle}>
                        <div className="row" style={rowStyle}>
                            <div className="col-md-3 fw-bold">{user.fullname}</div>
                        </div>
                        <Row>
                            <Col md={10}>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Designation</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.designation}</div>
                                    <div className="col-md-2">Project</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.project.name}</div>
                                </div>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Gate Pass No.</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.gate_pass_no}</div>
                                    <div className="col-md-2">Rig / Rigless</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.rig_or_rigless}</div>
                                </div>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Company</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.company.name}</div>
                                </div>
                            </Col>
                            <div className="row" style={rowStyle}>
                                <Col md={3}>
                                    <Button
                                        variant="danger"
                                        className="w-80 mt-3"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Remove Employee
                                    </Button>
                                </Col>
                                {/* <Col md={3}>
                                    <Button variant="secondary" className="w-50 mt-3">
                                        Cancel
                                    </Button>
                                </Col> */}
                            </div>
                        </Row>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {users.length > usersPerPage && (
                    <ul className="pagination mt-3" style={{marginLeft:"77px"}}>
                        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                            <li key={index} className="page-item">
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default EmpRemove;
