import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { fetchNotifications, updateUserStatus, userrequest } from "../services/allApi";
import Header from "../components/Header";
import "./EmpReq.css"; // Create and import a CSS file for custom styles

function EmpReq() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

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
                const response = await userrequest();
                console.log("Response:", response);
                const filteredUsers = response.data.filter(user => !user.is_accepted);
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAction = async (userId, action) => {
        if (action === 'reject') {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085D6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Reject it!"
            });
            if (!result.isConfirmed) {
                return;
            }
        }
    
        try {
            const response = await updateUserStatus(userId, action);
            console.log(`${action} response:`, response);
            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                if (action === 'accept') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Request Accepted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                } else if (action === 'reject') {
                    // Display toast notification for rejection
                    // You can also use a library like react-toastify for better UI
                    Swal.fire({
                        title: "Removed!",
                        text: "The user has been rejected.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                        
                    }).then(() => {
                        
                    });
                }
            }
            window.location.reload(); // Reload the page after successful reject

        } catch (error) {
            console.error(`Error ${action} user:`, error);
        }
    };
    

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

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
                {currentUsers?.map((user, index) => (
                    <div key={index} className="profile-card" style={profileCardStyle}>
                        <div className="row" style={rowStyle}>
                            <div className="col-md-3 fw-bold">{user.fullname}</div>
                        </div>
                        <Row>
                            <Col md={10}>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Designation</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.designation.name}</div>
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
                            <Col md={2}>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-75"
                                        onClick={() => handleAction(user.id, 'accept')}
                                    >
                                        Approve
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-danger w-75 mt-3"
                                        onClick={() => handleAction(user.id, 'reject')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}

                <Pagination className="mt-3">
                    {[...Array(Math.ceil(users.length / itemsPerPage)).keys()].map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
}

export default EmpReq;
