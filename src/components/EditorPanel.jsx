// src/components/EditorPanel.jsx
import React, { useState, useCallback, useRef } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner, Modal, ListGroup } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import './EditorPanel.css';

/**
 * Custom hook that returns a debounced version of a callback.
 */
function useDebouncedCallback(callback, delay) {
  const timer = useRef(null);
  return useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

// Memoized ProjectEditor to prevent unnecessary re-renders.
const ProjectEditor = React.memo(({
  project,
  index,
  onProjectChange,
  onRemoveProject,
  onGenerateAI,
  aiLoading,
  aiSuggestions,
  onAcceptAISuggestion,
}) => {
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
          <div className="mt-2">
            <Button variant="secondary" size="sm" onClick={() => onGenerateAI(index)}>
              Generate AI Description
            </Button>
            {aiLoading && <Spinner animation="border" size="sm" className="ms-2" />}
          </div>
          {aiSuggestions && aiSuggestions.length > 0 && (
            <div className="mt-2">
              <small>AI Suggestions:</small>
              {aiSuggestions.map((suggestion, sIndex) => (
                <div
                  key={sIndex}
                  className="p-1 border rounded mt-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onAcceptAISuggestion(index, suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </Col>
        <Col md={2}>
          <Button variant="danger" onClick={() => onRemoveProject(index)}>
            Remove
          </Button>
        </Col>
      </Row>
    </motion.div>
  );
});

const EditorPanel = () => {
  const { userData, setUserData } = usePortfolio();
  const [showAlert, setShowAlert] = useState(false);

  // State for AI generation.
  const [aiBioLoading, setAiBioLoading] = useState(false);
  const [aiBioSuggestions, setAiBioSuggestions] = useState([]);
  const [aiProjectState, setAiProjectState] = useState({});
  const hfApiKey = import.meta.env.VITE_REACT_APP_HF_API_KEY;
  if (!hfApiKey) {
    console.error('Missing VITE_REACT_APP_HF_API_KEY in environment variables');
  }

  // Template customization states:
  const availableFonts = [
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Poppins', value: 'Poppins, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
  ];
  // Assume userData.sections is an array of section keys.
  const initialSections = userData.sections || ['header', 'about', 'projects', 'contact', 'testimonials'];
  const [sections, setSections] = useState(initialSections);
  // Custom template upload states.
  const [showCustomTemplateModal, setShowCustomTemplateModal] = useState(false);
  const [customTemplateName, setCustomTemplateName] = useState('');
  const [customTemplateImage, setCustomTemplateImage] = useState(null);

  if (!userData) {
    return <p>Loading...</p>;
  }

  // Event handlers for user details.
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }, [setUserData]);

  const handleProjectChange = useCallback((index, field, value) => {
    const updatedProjects = userData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setUserData(prev => ({ ...prev, projects: updatedProjects }));
  }, [userData.projects, setUserData]);

  const addNewProject = useCallback(() => {
    setUserData(prev => ({ ...prev, projects: [...prev.projects, { title: '', description: '' }] }));
  }, [setUserData]);

  const removeProject = useCallback((index) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    setUserData(prev => ({ ...prev, projects: updatedProjects }));
  }, [userData.projects, setUserData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  }, []);

  // AI generation functions.
  const generateAIBio = useCallback(async () => {
    if (!userData.profession) return;
    setAiBioLoading(true);
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-3B", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hfApiKey}`,
        },
        body: JSON.stringify({
          inputs: `Generate a compelling and concise professional bio for someone who is a ${userData.profession} with experience in [specific skill or industry]. Highlight key strengths and accomplishments.`,
          parameters: { num_return_sequences: 3 },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch AI bio suggestions');
      }
      const data = await response.json();
      const suggestions = Array.isArray(data) ? data.map(item => item.generated_text) : [];
      setAiBioSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating AI bio:', error);
    } finally {
      setAiBioLoading(false);
    }
  }, [userData.profession, hfApiKey]);

  const generateAIProjectDescription = useCallback(async (index) => {
    const project = userData.projects[index];
    if (!project.title) return;
    setAiProjectState(prev => ({ ...prev, [index]: { loading: true, suggestions: [] } }));
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/bigscience/bloom", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hfApiKey}`,
        },
        body: JSON.stringify({
          inputs: `Generate a project description for a project titled "${project.title}".`,
          parameters: { num_return_sequences: 3 },
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch AI project description for project ${index}`);
      }
      const data = await response.json();
      const suggestions = Array.isArray(data) ? data.map(item => item.generated_text) : [];
      setAiProjectState(prev => ({ ...prev, [index]: { loading: false, suggestions } }));
    } catch (error) {
      console.error(`Error generating AI description for project ${index}:`, error);
      setAiProjectState(prev => ({ ...prev, [index]: { loading: false, suggestions: [] } }));
    }
  }, [userData.projects, hfApiKey]);

  const debouncedGenerateAIBio = useDebouncedCallback(generateAIBio, 300);
  const debouncedGenerateAIProjectDescription = useDebouncedCallback(generateAIProjectDescription, 300);

  const acceptAIBioSuggestion = useCallback((suggestion) => {
    setUserData(prev => ({ ...prev, bio: suggestion }));
    setAiBioSuggestions([]);
  }, [setUserData]);

  const acceptAIProjectSuggestion = useCallback((index, suggestion) => {
    const updatedProjects = userData.projects.map((project, i) =>
      i === index ? { ...project, description: suggestion } : project
    );
    setUserData(prev => ({ ...prev, projects: updatedProjects }));
    setAiProjectState(prev => ({ ...prev, [index]: { ...prev[index], suggestions: [] } }));
  }, [userData.projects, setUserData]);

  // Template customization handlers.
  const handleFontChange = (e) => {
    const font = e.target.value;
    setUserData(prev => ({ ...prev, templateFont: font }));
  };

  const handlePrimaryColorChange = (e) => {
    const primaryColor = e.target.value;
    setUserData(prev => ({ ...prev, primaryColor }));
  };

  const handleSecondaryColorChange = (e) => {
    const secondaryColor = e.target.value;
    setUserData(prev => ({ ...prev, secondaryColor }));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newSections = Array.from(sections);
    const [movedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, movedItem);
    setSections(newSections);
    setUserData(prev => ({ ...prev, sections: newSections }));
  };

  const handleCustomTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomTemplateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomTemplate = () => {
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: customTemplateName,
      image: customTemplateImage,
      font: userData.templateFont || 'Arial, sans-serif',
      primaryColor: userData.primaryColor || '#007bff',
      secondaryColor: userData.secondaryColor || '#ffffff',
      sections: sections,
    };
    setUserData(prev => ({
      ...prev,
      customTemplates: prev.customTemplates ? [...prev.customTemplates, newTemplate] : [newTemplate],
      selectedTemplate: newTemplate,
    }));
    setShowCustomTemplateModal(false);
    setCustomTemplateName('');
    setCustomTemplateImage(null);
  };

  return (
    <Container className="p-4 border-start editor-panel-container">
      <h3>Edit Portfolio</h3>
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
        {/* User Details */}
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
          <div className="mt-2">
            <Button variant="secondary" size="sm" onClick={debouncedGenerateAIBio}>
              Generate AI Bio
            </Button>
            {aiBioLoading && <Spinner animation="border" size="sm" className="ms-2" />}
          </div>
          {aiBioSuggestions.length > 0 && (
            <div className="mt-2">
              <small>AI Bio Suggestions:</small>
              {aiBioSuggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="p-1 border rounded mt-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => acceptAIBioSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </Form.Group>

        {/* Projects Section */}
        <h4>Projects</h4>
        {Array.isArray(userData.projects) && userData.projects.length > 0 ? (
          userData.projects.map((project, index) => (
            <ProjectEditor
              key={index}
              project={project}
              index={index}
              onProjectChange={handleProjectChange}
              onRemoveProject={removeProject}
              onGenerateAI={() => debouncedGenerateAIProjectDescription(index)}
              aiLoading={aiProjectState[index]?.loading}
              aiSuggestions={aiProjectState[index]?.suggestions}
              onAcceptAISuggestion={acceptAIProjectSuggestion}
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

      <hr />

      {/* Template Customization Options */}
      <h3>Template Customization</h3>
      <Form>
        {/* Font Selection */}
        <Form.Group className="mb-3" controlId="templateFont">
          <Form.Label>Font Selection</Form.Label>
          <Form.Select onChange={handleFontChange} value={userData.templateFont || 'Arial, sans-serif'}>
            {availableFonts.map((font, idx) => (
              <option key={idx} value={font.value}>{font.label}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Color Customization */}
        <Form.Group className="mb-3" controlId="primaryColor">
          <Form.Label>Primary Color</Form.Label>
          <Form.Control
            type="color"
            onChange={handlePrimaryColorChange}
            value={userData.primaryColor || '#007bff'}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="secondaryColor">
          <Form.Label>Secondary Color</Form.Label>
          <Form.Control
            type="color"
            onChange={handleSecondaryColorChange}
            value={userData.secondaryColor || '#ffffff'}
          />
        </Form.Group>

        {/* Section Reordering */}
        <Form.Group className="mb-3">
          <Form.Label>Reorder Portfolio Sections</Form.Label>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {sections.map((section, index) => (
                    <Draggable key={section} draggableId={section} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </Form.Group>

        {/* Custom Template Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Create / Upload Custom Template</Form.Label>
          <Form.Control
            type="text"
            placeholder="Template Name"
            value={customTemplateName}
            onChange={(e) => setCustomTemplateName(e.target.value)}
          />
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleCustomTemplateUpload}
            className="mt-2"
          />
          <Button variant="success" className="mt-2" onClick={() => setShowCustomTemplateModal(true)}>
            Save Custom Template
          </Button>
        </Form.Group>
      </Form>

      {/* Modal for Custom Template Confirmation */}
      <Modal show={showCustomTemplateModal} onHide={() => setShowCustomTemplateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Custom Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to save this custom template?</p>
          {customTemplateImage && (
            <img
              src={customTemplateImage}
              alt="Custom Template Preview"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCustomTemplateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCustomTemplate}>
            Save Template
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditorPanel;
