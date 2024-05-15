import React, { useState } from "react";
import { Col, Nav, Row, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import "./Pwer.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Header from "../components/Header";
function Prof() {
  const [activeKey, setActiveKey] = useState("/home");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const handleStartDateClick = () => {
    setShowStartDateCalendar(true);
    setShowEndDateCalendar(false);
  };
  const handleEndDateClick = () => {
    setShowEndDateCalendar(true);
    setShowStartDateCalendar(false);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const renderContent = () => {
    switch (activeKey) {
      case "/home":
        return <div>External Training Content</div>;
      case "/hom":
        return (
          <div>
            <div>
              <p>
                <b>Permit to work (CAIRN)</b>
              </p>
              <Row>
                <Col md={8}>
                  <div className="bar-container" style={{ width: "100%" }}>
                    <div className="base-bar"></div>
                    <div className="base-bar first-bar mt-5"></div>
                    <span
                      className="spann"
                      style={{
                        color: "#D53232",
                        position: "absolute",
                        top: -5,
                        right: 0,
                      }}
                    >
                      47%
                    </span>
                  </div>
                </Col>
                <Col md={2}>
                  <input
                    style={{ padding: "5px" }}
                    type="date"
                    id="date"
                    name="date"
                  ></input>
                </Col>
                <Col md={2}>
                  <Button
                    style={{ border: "3px solid red", fontWeight: 550 }}
                    className="w-75"
                    variant="outlined"
                    color="error"
                  >
                    Stop
                  </Button>
                </Col>
              </Row>
            </div>
            <div>
              <p>
                <b>Work at Height (CAIRN Content)</b>
              </p>
              <Row>
                <Col md={8}>
                  <div className="bar-container" style={{ width: "100%" }}>
                    <div className="base-bar"></div>
                    <div className="base-bar second-bar mt-5"></div>
                    <span
                      className="spann"
                      style={{
                        color: "#D53232",
                        position: "absolute",
                        top: -5,
                        right: 0,
                      }}
                    >
                      97%
                    </span>
                  </div>
                </Col>
                <Col md={2}>
                  <input
                    style={{ padding: "5px" }}
                    type="date"
                    id="date"
                    name="date"
                  ></input>
                </Col>
                <Col md={2}>
                  <Button
                    style={{ border: "3px solid blue", fontWeight: 550 }}
                    className="w-75"
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
              <p>
                <b>Confined space (CAIRN Content)</b>
              </p>
              <Row>
                <Col md={8}>
                  <div className="bar-container" style={{ width: "100%" }}>
                    <div className="base-bar"></div>
                    <div className="base-bar third-bar mt-5"></div>
                    <span
                      className="spann"
                      style={{
                        color: "#D53232",
                        position: "absolute",
                        top: -5,
                        right: 0,
                      }}
                    >
                      0%
                    </span>
                  </div>
                </Col>
                <Col md={2}>
                  <input
                    style={{ padding: "5px" }}
                    type="date"
                    id="date"
                    name="date"
                  ></input>
                </Col>
                <Col md={2}>
                  <Button
                    style={{ border: "3px solid blue", fontWeight: 550 }}
                    className="w-75"
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        );
      case "/hme":
        return (
          <div>
            {" "}
            <div>
              <div>
                <p>
                  <b>Work at Height (CAIRN)</b>
                </p>
                <Row>
                  <Col md={8}>
                    <div className="bar-container" style={{ width: "100%" }}>
                      <div className="base-bar"></div>
                      <div className="base-bar firstc-bar mt-5"></div>
                      <span
                        className="spann"
                        style={{
                          color: "#0DD55D",
                          position: "absolute",
                          top: -5,
                          right: 0,
                        }}
                      >
                        97%
                      </span>
                    </div>
                  </Col>
                  <Col md={2}>
                    <input
                      style={{ padding: "5px" }}
                      type="date"
                      id="date"
                      name="date"
                    ></input>
                  </Col>
                  <Col md={2}>
                    <Button
                      style={{ border: "3px solid red", fontWeight: 550 }}
                      className="w-75"
                      variant="outlined"
                      color="error"
                    >
                      Stop
                    </Button>
                  </Col>
                </Row>
              </div>
              <div>
                <p>
                  <b>Confined space (CAIRN Content)</b>
                </p>
                <Row>
                  <Col md={8}>
                    <div className="bar-container" style={{ width: "100%" }}>
                      <div className="base-bar"></div>
                      <div className="base-bar secondc-bar mt-5"></div>
                      <span
                        className="spann"
                        style={{
                          color: "#3260D5",
                          position: "absolute",
                          top: -5,
                          right: 0,
                        }}
                      >
                        0%
                      </span>
                    </div>
                  </Col>
                  <Col md={2}>
                    <input
                      style={{ padding: "5px" }}
                      type="date"
                      id="date"
                      name="date"
                    ></input>
                  </Col>
                  <Col md={2}>
                    <Button
                      style={{ border: "3px solid blue", fontWeight: 550 }}
                      className="w-75"
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        );
        case "/me":
        return <div>SLB Certified Training Content</div>;
      case "/he":
        return <div>Cairn Awareness Training Content</div>;
      default:
        return <div>External Training Content</div>;
    }
  };
  const renderProfileContent = () => {
    switch (activeKey) {
      case "/home":
        return <div></div>;
      case "/hom":
        return (
          <div>
            <div className="row  card shadow p-4">
              <label htmlFor="profiles" className="text-center">
                <input id="profiles" type="file" style={{ display: "none" }} />
                <img
                  width={"30%"}
                  src="https://get.pxhere.com/photo/man-person-people-male-asian-portrait-young-chinese-professional-business-profession-hairstyle-confident-spokesperson-businessperson-white-collar-worker-922334.jpg"
                  className=""
                  alt=""
                />
              </label>
              <p className="text-center" style={{ fontSize: "27px" }}>
                <b>Mustafa palakal</b>
              </p>
              <p className="text-center" style={{ fontSize: "15px" }}>
                Assistant Well Site Leader
              </p>
              <p>
                <b>Training Records</b>
              </p>
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p style={{ fontSize: "15px" }}>CIL Gate Pass No.</p>
                <p style={{ fontSize: "15px" }}>19882</p>
              </div>
              <hr />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p style={{ fontSize: "15px" }}>Crew</p>
                <p style={{ fontSize: "15px" }}>PRS Crew</p>
              </div>
              <hr />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p style={{ fontSize: "15px" }}>Project</p>
                <p style={{ fontSize: "15px" }}>RDG 27 Wells</p>
              </div>
              <hr />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p style={{ fontSize: "15px" }}>Rig / Rigless</p>
                <p style={{ fontSize: "15px" }}>RIGLESS</p>
              </div>
              <hr />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <p style={{ fontSize: "15px" }}>Company</p>
                <p style={{ fontSize: "15px" }}>TCI</p>
              </div>
              <hr />
              <div className=" mt-3">
                <Row>
                  <Col md={7}></Col>
                  <Col md={4}>
                    <button
                      style={{ backgroundColor: "#C8C8C8", color: "black" }}
                      className="btn btn-rounded w-100"
                    >
                      Edit
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        );
      case "/hme":
        return (
          <div>
            {" "}
            <div className="row card shadow p-4">
              <label htmlFor="profiles" className="text-center">
                <input id="profiles" type="file" style={{ display: "none" }} />
                <img
                  width={"30%"}
                  src="https://get.pxhere.com/photo/man-person-people-male-asian-portrait-young-chinese-professional-business-profession-hairstyle-confident-spokesperson-businessperson-white-collar-worker-922334.jpg"
                  className=""
                  alt=""
                />
              </label>
              <p className="text-center" style={{ fontSize: "27px" }}>
                <b>Mustafa palakal</b>
              </p>
              <p className="text-center" style={{ fontSize: "15px" }}>
                Assistant Well Site Leader
              </p>
              <p>
                <b>Overall Training (OTC)</b>
              </p>
              <div>
                {" "}
                <div className="bar-container ms-3" style={{ width: "90%" }}>
                  <div className="base-bars"></div>
                  <div className="base-bar profilec-bar "></div>
                  <span
                    className="spann"
                    style={{
                      color: "#0DD55D",
                      position: "absolute",
                      top: -20,
                      right: 0,
                    }}
                  >
                    88%
                  </span>
                </div>
                <p>
                  <b>Training Records</b>
                </p>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p style={{ fontSize: "15px" }}>CIL Gate Pass No.</p>
                  <p style={{ fontSize: "15px" }}>19882</p>
                </div>
                <hr />
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p style={{ fontSize: "15px" }}>Crew</p>
                  <p style={{ fontSize: "15px" }}>PRS Crew</p>
                </div>
                <hr />
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p style={{ fontSize: "15px" }}>Project</p>
                  <p style={{ fontSize: "15px" }}>RDG 27 Wells</p>
                </div>
                <hr />
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p style={{ fontSize: "15px" }}>Rig / Rigless</p>
                  <p style={{ fontSize: "15px" }}>RIGLESS</p>
                </div>
                <hr />
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <p style={{ fontSize: "15px" }}>Company</p>
                  <p style={{ fontSize: "15px" }}>TCI</p>
                </div>
                <hr />
                <div className=" mt-3">
                  <Row>
                    <Col md={7}></Col>
                    <Col md={4}>
                      <button
                        style={{ backgroundColor: "#C8C8C8", color: "black" }}
                        className="btn btn-rounded w-100"
                      >
                        Edit
                      </button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              <div className="card shadow  mt-3">
                <Nav
                  className=" p-3 mt-3 "
                  fill
                  variant="tabs"
                  defaultActiveKey="/start-date"
                >
                  <Nav.Item>
                    <Nav.Link
                      onClick={handleStartDateClick}
                      eventKey="/start-date"
                    >
                      Start Date
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleEndDateClick} eventKey="/end-date">
                      End Date
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              {showStartDateCalendar && (
                <DateRange
                  className="card shadow p-3"
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  months={1}
                  direction="horizontal"
                  showDateDisplay={false}
                  moveRangeOnFirstSelection={false}
                />
              )}
              {showEndDateCalendar && (
                <DateRange
                  className="card shadow p-3 mt-3"
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  months={1}
                  direction="horizontal"
                  showDateDisplay={false}
                  moveRangeOnFirstSelection={false}
                />
              )}
            </div>
          </div>
        );
      case "/me":
        return <div>Profile Content for SLB Certified Training</div>;
      case "/he":
        return <div>Profile Content for Cairn Awareness Training</div>;
      default:
        return <div>Default Profile Content</div>;
    }
  };
  const renderProfileSection = () => {
    return (
      <Col md={3} className="ms-5 mt-4">
        <div>{renderProfileContent()}</div>
      </Col>
    );
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <Row>
        {renderProfileSection()}
        <Col md={8} className="mt-5">
          <div className="card shadow p-4">
            <Nav
              variant="underline"
              activeKey={activeKey}
              onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
              <Nav.Item className="ms-5">
                <Nav.Link
                  eventKey="/home"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  External Training
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/hom"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Cairn Certified Training
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/hme"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Cairn Introduction Training
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/me"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  SLB Certified Training
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="/he"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Cairn Awareness Training
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div style={{ height: "50vh" }} className="card shadow p-3 mt-2">
            {renderContent()}
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Prof