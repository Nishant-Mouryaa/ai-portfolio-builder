// components/Profile.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import './Profile.css';

function Profile() {
  const { state, dispatch } = usePortfolio();
  const { user } = state;

  // Local state for profile details (initialize with user values)
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
  });
  const [profileImage, setProfileImage] = useState(user.avatarUrl || '');
  
  // Customization settings state (for demo)
  const [customization, setCustomization] = useState({
    font: 'Roboto',
    color: '#0d6efd',
    theme: 'dark',
  });
  
  // Security settings state
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Activity & usage stats (assumed to come from user.stats)
  const stats = user.stats || { projects: 10, templatesUsed: 5, aiCredits: 100 };

  // Handlers for Profile Details
  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSaveProfile = () => {
    // Dispatch update to global context (assuming UPDATE_USER exists)
    dispatch({
      type: 'UPDATE_USER',
      payload: { ...profileData, avatarUrl: profileImage },
    });
    alert('Profile updated!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Handlers for Customization Settings
  const handleCustomizationChange = (field, value) => {
    setCustomization({ ...customization, [field]: value });
    // Optionally update global state here
    dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: { [field]: value } });
  };

  // Handlers for Security Settings
  const handleSecurityChange = (field, value) => {
    setSecurity({ ...security, [field]: value });
  };

  const handleChangePassword = () => {
    // Validate and change password (placeholder)
    alert('Password updated!');
  };

  const handleDeleteAccount = () => {
    // Confirm and delete account (placeholder)
    alert('Account deleted (simulated)!');
  };

  return (
    <Container fluid className="profile-page p-4">
      <h2 className="text-center mb-4">My Profile</h2>
      <Tabs defaultActiveKey="details" id="profile-tabs" className="mb-4" variant="pills">
        {/* Profile Details Tab */}
        <Tab eventKey="details" title="Profile Details">
          <Row className="mb-4">
            <Col md={4}>
              <Card className="mb-3 dark-card">
                <Card.Body className="text-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3 profile-img"
                  />
                  <Form.Group controlId="formProfilePicture" className="mb-3">
                    <Form.Label>Update Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleImageUpload} />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="mb-3 dark-card">
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Subscription & Plan Management Tab */}
        <Tab eventKey="subscription" title="Subscription">
          <Card className="mb-3 dark-card">
            <Card.Body>
              <h4>Current Plan: {user.plan}</h4>
              <p>
                Upgrade to unlock advanced templates, AI-powered features, and more.
              </p>
              <Button variant="success">Upgrade Now</Button>
            </Card.Body>
          </Card>
          <Card className="mb-3 dark-card">
            <Card.Header>Billing & Payment History</Card.Header>
            <Card.Body>
              <p>No billing history available (demo data).</p>
            </Card.Body>
          </Card>
        </Tab>

        {/* Customization Settings Tab */}
        <Tab eventKey="customization" title="Customization">
          <Card className="mb-3 dark-card">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formFont">
                  <Form.Label>Font Family</Form.Label>
                  <Form.Control
                    type="text"
                    value={customization.font}
                    onChange={(e) => handleCustomizationChange('font', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formColor">
                  <Form.Label>Primary Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={customization.color}
                    onChange={(e) => handleCustomizationChange('color', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTheme">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    value={customization.theme}
                    onChange={(e) => handleCustomizationChange('theme', e.target.value)}
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* Account & Security Tab */}
        <Tab eventKey="security" title="Account & Security">
          <Card className="mb-3 dark-card">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formCurrentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleChangePassword}>
                  Change Password
                </Button>
                <hr />
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mb-3 dark-card">
            <Card.Body>
              <h5>Connect Your Social Accounts</h5>
              <Button variant="outline-light" className="me-2">
                Connect GitHub
              </Button>
              <Button variant="outline-light">
                Connect LinkedIn
              </Button>
            </Card.Body>
          </Card>
        </Tab>

        {/* Activity & Usage Stats Tab */}
        <Tab eventKey="activity" title="Activity & Stats">
          <Card className="mb-3 dark-card">
            <Card.Body>
              <h5>Activity & Usage Stats</h5>
              <p><strong>Projects Created:</strong> {stats.projects}</p>
              <p><strong>Templates Used:</strong> {stats.templatesUsed}</p>
              <p><strong>AI Credits Left:</strong> {stats.aiCredits}</p>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Profile;
