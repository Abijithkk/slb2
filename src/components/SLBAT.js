import React from 'react'
import { Button, Col, ProgressBar, Row } from 'react-bootstrap'
import '../pages/Profile.css'


function SLBAT() {

    const now = 70;

  return (
    <div>
        <div style={{ height: "auto" }} className="card shadow p-3 mt-2">
                    <p><b>Life Saving Rules</b></p>
                    <Row>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" id="date" className="form-control" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" id="date" className="form-control" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid red", fontWeight: 550, marginLeft: "22px" }} className="w-80" variant="outlined" color="error">
                          Remove
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <p><b>Fatigue Management Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid red", fontWeight: 550, marginLeft: "22px" }} className="w-80" variant="outlined" color="error">
                          Remove
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <p><b>SLB PTW-Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid red", fontWeight: 550, marginLeft: "22px" }} className="w-80" variant="outlined" color="error">
                          Remove
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <p><b>Electrical Safety Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <p><b>Environmental Awareness & Waste Management Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>First Aid Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Fire Safety & Emergency Response Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Environmental Awareness & Waste Management Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Hazard Identification Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Mechanical Lifting Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>DROPS Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Hazardous Material Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Hands Injury Prevention</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Lock Out Tag Out (LOTO) Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>COVID-19 Awareess & COVID Life Saving Rules</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Personal Protective Equipment (PPE) Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Pressure Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Radiation Safety Level-1</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Process Safety L1 (Video)</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Engagement Alert - Crane Fatality (Video)</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <p><b>Engagement Alert - Forklift Fatality (Video)</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                        <ProgressBar variant='primary' style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
                        </div>
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <input style={{ padding: "5px", width: '113%' }} type="date" className="form-control" id="date" name="date" />
                      </Col>
                      <Col md={2}>
                        <Button style={{ border: "3px solid blue", fontWeight: 550, marginLeft: "22px" }} className="w-75" variant="outlined" color="error">
                          Add
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button style={{ marginLeft: '152%', border: 'none', backgroundColor: '#E6E6E6', height: '35px', color: 'black', width: '20%' }}>Cancel</Button>
                      </Col>
                      <Col>
                        <Button style={{ marginLeft: '73%', border: 'none', backgroundColor: 'rgba(0, 20, 220, 1)', height: '35px', color: 'white', width: '27%' }}>Submit</Button>
                      </Col>
                    </Row>
                  </div>
    </div>
  )
}

export default SLBAT