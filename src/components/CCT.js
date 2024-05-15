import React from 'react'
import { Button, Col, ProgressBar, Row } from 'react-bootstrap'
import '../pages/Profile.css'


function CCT() {

    const now = 70;

  return (
    <div>
        <div style={{ height: "auto" }} className="card shadow p-3 mt-2">
                    <p><b>Work at Height (CAIRN Content)</b></p>
                    <Row>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                          <ProgressBar style={{ height: '16px' }} variant='success' className="w-100" now={now} label={`${now}%`} />
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
                      <p><b>Confined space (CAIRN Content)</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                          <ProgressBar style={{ height: '16px' }} className="w-100" now={now} label={`${now}%`} />
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
                      <p><b>Fire Fighting & SCBA (CAIRN Content)</b></p>
                      <Col md={6}>
                        <div className="bar-container" style={{ width: "100%" }}>
                          <ProgressBar style={{ height: '16px' }} variant="danger" className="w-100" now={now} label={`${now}%`} />
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

export default CCT