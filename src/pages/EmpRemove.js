import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import Header from "../components/Header";

function EmpRemove() {
    const profileCardStyle = {
        padding: "20px",
        borderBottom: "1px solid black",
    };

    const rowStyle = {
        marginBottom: "10px",
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="profile-card" style={profileCardStyle}>
                    <div className="row" style={rowStyle}>
                        <div className="col-md-3 fw-bold">Musthafa Palakkal</div>
                    </div>
                    <Row>
                        <Col md={10}>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Designation</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">Assistant Well Site Leader</div>
                                <div className="col-md-2">Project</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">RDG 27 Wells</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">CIL Gate Pass No.</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">19794</div>
                                <div className="col-md-2">Rig / Rigless</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">RIGLESS</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Crew</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">PRS Crew</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">TCI</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <Col md={3}>
                                    <Button variant="danger" className="w-80 mt-3">
                                        Remove Employee
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button variant="secondary" className="w-50 mt-3">
                                        Cancel
                                    </Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="profile-card" style={profileCardStyle}>
                    <div className="row" style={rowStyle}>
                        <div className="col-md-3 fw-bold">Musthafa Palakkal</div>
                    </div>
                    <Row>
                        <Col md={10}>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Designation</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">Assistant Well Site Leader</div>
                                <div className="col-md-2">Project</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">RDG 27 Wells</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">CIL Gate Pass No.</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">19794</div>
                                <div className="col-md-2">Rig / Rigless</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">RIGLESS</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Crew</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-3">PRS Crew</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-1">:</div>
                                <div className="col-md-2">TCI</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <Col md={3}>
                                    <Button variant="danger" className="w-80 mt-3">
                                    Remove Employee
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button variant="secondary" className="w-50 mt-3">
                                        Cancel
                                    </Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default EmpRemove;
