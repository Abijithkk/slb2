import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../components/Header";
function EmpReq() {
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
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">Assistant Well Site Leader</div>
                                <div className="col-md-2">Project</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RDG 27 Wells</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">CIL Gate Pass No.</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">19794</div>
                                <div className="col-md-2">Rig / Rigless</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RIGLESS</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Crew</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">PRS Crew</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">TCI</div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-primary w-75 ">
                                    Approve
                                </button>
                            </div>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-danger w-75 mt-3 ">
                                    Reject
                                </button>
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
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">Assistant Well Site Leader</div>
                                <div className="col-md-2">Project</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RDG 27 Wells</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">CIL Gate Pass No.</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">19794</div>
                                <div className="col-md-2">Rig / Rigless</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RIGLESS</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Crew</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">PRS Crew</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">TCI</div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-primary w-75 ">
                                    Approve
                                </button>
                            </div>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-danger w-75 mt-3 ">
                                    Reject
                                </button>
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
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">Assistant Well Site Leader</div>
                                <div className="col-md-2">Project</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RDG 27 Wells</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">CIL Gate Pass No.</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">19794</div>
                                <div className="col-md-2">Rig / Rigless</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">RIGLESS</div>
                            </div>
                            <div className="row" style={rowStyle}>
                                <div className="col-md-2">Crew</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-3">PRS Crew</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-1">:</div>{" "}
                                <div className="col-md-2">TCI</div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-primary w-75 ">
                                    Approve
                                </button>
                            </div>
                            <div>
                                {" "}
                                <button type="button" className="btn btn-danger w-75 mt-3 ">
                                    Reject
                                </button>
                            </div>
                        </Col>
                        
                    </Row>
                    
                </div>
            </div>
        </div>
    );
}
export default EmpReq;