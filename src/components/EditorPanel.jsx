import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

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

  // State for AI bio generation.
  const [aiBioLoading, setAiBioLoading] = useState(false);
  const [aiBioSuggestions, setAiBioSuggestions] = useState([]);

  // State for AI project description generation.
  // Mapping: project index => { loading: boolean, suggestions: array }
  const [aiProjectState, setAiProjectState] = useState({});

  // Ensure your API key is available.
  const hfApiKey = import.meta.env.VITE_REACT_APP_HF_API_KEY;
  if (!hfApiKey) {
    console.error('Missing VITE_REACT_APP_HF_API_KEY in environment variables');
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  // -----------------------------
  // Event Handlers (memoized with useCallback)
  // -----------------------------
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }, [setUserData]);

  const handleProjectChange = useCallback((index, field, value) => {
    const updatedProjects = userData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setUserData((prev) => ({ ...prev, projects: updatedProjects }));
  }, [userData.projects, setUserData]);

  const addNewProject = useCallback(() => {
    setUserData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }],
    }));
  }, [setUserData]);

  const removeProject = useCallback((index) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    setUserData((prev) => ({ ...prev, projects: updatedProjects }));
  }, [userData.projects, setUserData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  }, []);

  // -----------------------------
  // AI Generation Functions (memoized)
  // -----------------------------
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
    setAiProjectState((prev) => ({ ...prev, [index]: { loading: true, suggestions: [] } }));
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
      setAiProjectState((prev) => ({ ...prev, [index]: { loading: false, suggestions } }));
    } catch (error) {
      console.error(`Error generating AI description for project ${index}:`, error);
      setAiProjectState((prev) => ({ ...prev, [index]: { loading: false, suggestions: [] } }));
    }
  }, [userData.projects, hfApiKey]);

  // -----------------------------
  // Create debounced versions of the AI generation functions
  // -----------------------------
  const debouncedGenerateAIBio = useDebouncedCallback(generateAIBio, 300);
  const debouncedGenerateAIProjectDescription = useDebouncedCallback(generateAIProjectDescription, 300);

  // -----------------------------
  // Accept AI suggestions (memoized)
  // -----------------------------
  const acceptAIBioSuggestion = useCallback((suggestion) => {
    setUserData((prev) => ({ ...prev, bio: suggestion }));
    setAiBioSuggestions([]);
  }, [setUserData]);

  const acceptAIProjectSuggestion = useCallback((index, suggestion) => {
    const updatedProjects = userData.projects.map((project, i) =>
      i === index ? { ...project, description: suggestion } : project
    );
    setUserData((prev) => ({ ...prev, projects: updatedProjects }));
    setAiProjectState((prev) => ({ ...prev, [index]: { ...prev[index], suggestions: [] } }));
  }, [userData.projects, setUserData]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <Container className="p-4 border-start">
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
    </Container>
  );
};

export default EditorPanel;
