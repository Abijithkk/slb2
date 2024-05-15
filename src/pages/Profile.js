import React, { useState } from 'react';
import './Profile.css';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import CCT from '../components/CCT';
import CIT from '../components/CIT';
import Header from '../components/Header';
import SLBAT from '../components/SLBAT';
import SLBCT from '../components/SLBCT';
import EXT from '../components/EXT';


function Profile() {
  const progressPercentage = 88; // Change this value as needed
  const [selectedHeading, setSelectedHeading] = useState('External Training');
  const [showContent, setShowContent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    gatePassNo: '19794',
    crew: 'PRS Crew',
    project: 'RDG 27 Wells',
    rig: 'Rigless',
    company: 'TCI'
  });
  const handleHeadingClick = (heading) => {
    setSelectedHeading(heading); // Set the selected heading
    setShowContent(true); // Always show content when a heading is clicked
  };
  const handleEditClick = () => {
    setIsEditMode(!isEditMode); // Toggle edit mode
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const renderContentComponent = () => {
    switch (selectedHeading) {
      case 'External Training':
        return <EXT/>; // Render the Tg component for 'External Training'
      case 'Cairn Certified Training':
        return <CCT/>; // Render the Tg component for 'Cairn Certified Training'
      case 'Cairn Introduction Training':
        return <CIT />; // Render the YH component for 'Cairn Introduction Training'
      case 'SLB Certified Training':
        return  <SLBCT /> ; // Render the Tg component for 'SLB Certified Training'
      case 'SLB Awareness Training':
        return <SLBAT /> ;// Render the Tg component for 'SLB Awareness Training'
      default:
        return null;
    }
  };



  return (
    <div>
        <Header></Header>
        <div className="profile-wrapper mt-3">
          <Container fluid>
            <Row className="profile-container">
              <Col sm={3} className="menu" style={{ marginLeft: '3%' }}>
                <div className="profile-info">
                  <div className="profile-image">
                    <img src="https://i.postimg.cc/Pqd5ddv4/profile-user.png" alt="Profile" />
                  </div>
                  <div className="profile-details">
                    <p id='name'>Musthafa Palakkal</p>
                    <p id='job'>Assistant Well Site Leader</p>
                  </div>
                </div>
                <div className="progress-container">
                  <p id='otc'>Overall training (OTC)</p>
                  <ProgressBar style={{ height: '13px' }} now={progressPercentage} label={`${progressPercentage}%`} variant="success" />
                </div>
                <p className="form-heading">Training records</p>
                <form className="training-form">
                  <div className="form-row">
                    <div className="form-col-left">CIL Gate Pass No.</div>
                    <div className="form-col-right">
                      {isEditMode ? (
                        <input style={{border:'none',textAlign:'end'}} type="text" name="gatePassNo" value={formValues.gatePassNo} onChange={handleInputChange} />
                      ) : (
                        formValues.gatePassNo
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col-left">Crew</div>
                    <div className="form-col-right">
                      {isEditMode ? (
                        <input style={{border:'none',textAlign:'end'}} type="text" name="crew" value={formValues.crew} onChange={handleInputChange} />
                      ) : (
                        formValues.crew
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col-left">Project</div>
                    <div className="form-col-right">
                      {isEditMode ? (
                        <input style={{border:'none',textAlign:'end'}} type="text" name="project" value={formValues.project} onChange={handleInputChange} />
                      ) : (
                        formValues.project
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col-left">Rig/Rigless</div>
                    <div className="form-col-right">
                      {isEditMode ? (
                        <input style={{border:'none',textAlign:'end'}} type="text" name="rig" value={formValues.rig} onChange={handleInputChange} />
                      ) : (
                        formValues.rig
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col-left">Company</div>
                    <div className="form-col-right">
                      {isEditMode ? (
                        <input style={{border:'none',textAlign:'end'}} type="text" name="company" value={formValues.company} onChange={handleInputChange} />
                      ) : (
                        formValues.company
                      )}
                    </div>
                  </div>
                  <Button onClick={handleEditClick} style={{ marginLeft: '73%', border: 'none', backgroundColor: '#E6E6E6', width: '26%', height: '35px', color: 'black' }}>
                    {isEditMode ? 'Save' : 'Edit'}
                  </Button>
                </form>
              </Col>
              <Col sm={8} className="content" style={{ marginLeft: '2%' }}>
                <div className="heading-section">
                  <div className="heading-list">
                    <div className={selectedHeading === 'External Training' ? 'heading selected' : 'heading'} onClick={() => handleHeadingClick('External Training')}>
                      External Training
                    </div>
                    <div className={selectedHeading === 'Cairn Certified Training' ? 'heading selected' : 'heading'} onClick={() => handleHeadingClick('Cairn Certified Training')}>
                      Cairn Certified Training
                    </div>
                    <div className={selectedHeading === 'Cairn Introduction Training' ? 'heading selected' : 'heading'} onClick={() => handleHeadingClick('Cairn Introduction Training')}>
                      Cairn Introduction Training
                    </div>
                    <div className={selectedHeading === 'SLB Certified Training' ? 'heading selected' : 'heading'} onClick={() => handleHeadingClick('SLB Certified Training')}>
                      SLB Certified Training
                    </div>
                    <div className={selectedHeading === 'SLB Awareness Training' ? 'heading selected' : 'heading'} onClick={() => handleHeadingClick('SLB Awareness Training')}>
                      SLB Awareness Training
                    </div>
                  </div>
                </div>
                {showContent && renderContentComponent()}
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  );
}
export default Profile;