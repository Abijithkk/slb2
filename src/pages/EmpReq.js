import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateUserStatus, userrequest } from "../services/allApi";
import Header from "../components/Header";
function EmpReq() {
    const [users, setUsers] = useState([]);
    const profileCardStyle = {
        padding: "20px",
        borderBottom: "1px solid black",
    };
    const rowStyle = {
        marginBottom: "10px",
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userrequest();
                console.log("Response:", response);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
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
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== userId)
                );
                if (action === 'accept') {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (action === 'reject') {
                    Swal.fire({
                        title: "Removed!",
                        text: "The user has been rejected.",
                        icon: "success"
                    });
                }
            }
        } catch (error) {
            console.error(`Error ${action} user:`, error);
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="container mt-5">
                {users?.map((user, index) => (
                    <div key={index} className="profile-card" style={profileCardStyle}>
                        <div className="row" style={rowStyle}>
                            <div className="col-md-3 fw-bold">{user.name}</div>
                        </div>
                        <Row>
                            <Col md={10}>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Designation</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.designation}</div>
                                    <div className="col-md-2">Project</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.project_name}</div>
                                </div>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">CIL Gate Pass No.</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.gate_pass_no}</div>
                                    <div className="col-md-2">Rig / Rigless</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.rig_or_rigless}</div>
                                </div>
                                <div className="row" style={rowStyle}>
                                    <div className="col-md-2">Crew</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-3">{user.crew}</div>
                                    <div className="col-md-2">Company</div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-2">{user.company_name}</div>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-75"
                                        onClick={() => handleAction(user.user, 'accept')}
                                    >
                                        Approve
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-danger w-75 mt-3"
                                        onClick={() => handleAction(user.user, 'reject')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default EmpReq;