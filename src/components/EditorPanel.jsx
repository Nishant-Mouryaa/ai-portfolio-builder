import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

// A separate component to handle individual project editing
const ProjectEditor = ({ project, index, onProjectChange, onRemoveProject }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <Row className="mb-3 align-items-end">
        <Col md={5}>
          <Form.Group controlId={`projectTitle-${index}`}>
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project title"
              value={project.title}
              onChange={(e) => onProjectChange(index, 'title', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId={`projectDescription-${index}`}>
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project description"
              value={project.description}
              onChange={(e) => onProjectChange(index, 'description', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="danger" onClick={() => onRemoveProject(index)}>
            Remove
          </Button>
        </Col>
      </Row>
    </motion.div>
  );
};

const EditorPanel = () => {
  const { userData, setUserData } = usePortfolio();
  const [showAlert, setShowAlert] = useState(false);

  // If userData isn't loaded yet, show a loading message.
  if (!userData) {
    return <p>Loading...</p>;
  }

  // Handle changes for main portfolio fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes within a project.
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = userData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setUserData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  // Add a new empty project.
  const addNewProject = () => {
    setUserData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }],
    }));
  };

  // Remove a project by index.
  const removeProject = (index) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add additional save logic, such as an API call.
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <Container className="p-4 border-start">
      <h3>Edit Portfolio</h3>
      
      {/* Animated Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Changes saved successfully!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="portfolioName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="portfolioProfession">
          <Form.Label>Profession</Form.Label>
          <Form.Control
            type="text"
            name="profession"
            value={userData.profession}
            onChange={handleChange}
            placeholder="Enter your profession"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="portfolioBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Enter a brief bio"
          />
        </Form.Group>

        <h4>Projects</h4>
        {Array.isArray(userData.projects) && userData.projects.length > 0 ? (
          userData.projects.map((project, index) => (
            <ProjectEditor
              key={index}
              project={project}
              index={index}
              onProjectChange={handleProjectChange}
              onRemoveProject={removeProject}
            />
          ))
        ) : (
          <p>No projects added yet.</p>
        )}

        <div className="d-flex flex-wrap">
          <Button variant="secondary" className="mt-3 me-2" onClick={addNewProject}>
            + Add Project
          </Button>
          <Button variant="primary" className="mt-3" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditorPanel;
