// components/AISuggestions.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import './AISuggestions.css';

function AISuggestions() {
  const { state, dispatch } = usePortfolio();
  const { activeSection, sections } = state;
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');
  const [targetField, setTargetField] = useState('title'); // default field

  // Predefined suggestions for each section and field.
  const suggestions = {
    hero: {
      title: [
        "Innovative Portfolio of a Creative Visionary",
        "Digital Storytelling in Motion",
        "Crafting Experiences Through Code"
      ],
      subtitle: [
        "Where creativity meets technology.",
        "Turning ideas into reality.",
        "Pushing the boundaries of digital innovation."
      ]
    },
    projects: {
      title: [
        "Featured Projects",
        "My Latest Creations",
        "Showcase of Excellence"
      ],
      description: [
        "A brief overview of my project achievements.",
        "Highlighting innovative work in action.",
        "Projects that define my journey."
      ]
    },
    skills: {
      title: [
        "Core Competencies",
        "Technical Expertise",
        "Skillset Overview"
      ]
    },
    testimonials: {
      name: [
        "Alex Johnson",
        "Jamie Lee",
        "Taylor Smith"
      ],
      feedback: [
        "Outstanding work and dedication.",
        "A true professional with a creative spark.",
        "Transformed our project with innovative ideas."
      ]
    },
    contact: {
      title: [
        "Get in Touch",
        "Let's Connect",
        "Contact Me"
      ]
    }
  };

  // Simulated suggestion generation function.
  const handleSuggest = () => {
    setLoading(true);
    setError('');
    
    // Retrieve the current section data for debugging if needed.
    const currentSection = sections[activeSection];

    // Check if we have suggestions for the active section and target field.
    if (!suggestions[activeSection] || !suggestions[activeSection][targetField]) {
      setError("No suggestions available for this section/field.");
      setLoading(false);
      return;
    }

    const possibleSuggestions = suggestions[activeSection][targetField];
    // Pick a random suggestion.
    const randomIndex = Math.floor(Math.random() * possibleSuggestions.length);
    const generatedSuggestion = possibleSuggestions[randomIndex];

    setSuggestion(generatedSuggestion);
    setLoading(false);
  };

  const applySuggestion = () => {
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: {
        section: activeSection,
        data: { [targetField]: suggestion }
      }
    });
    setSuggestion('');
  };

  return (
    <div className="ai-suggestions p-3 bg-secondary text-white rounded">
      <h5>
        AI Suggestions for {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h5>
      
      <Form.Group className="mb-2">
        <Form.Label>Apply suggestion to:</Form.Label>
        <Form.Select
          value={targetField}
          onChange={(e) => setTargetField(e.target.value)}
        >
          {activeSection === 'hero' && (
            <>
              <option value="title">Title</option>
              <option value="subtitle">Subtitle</option>
            </>
          )}
          {activeSection === 'projects' && (
            <>
              <option value="title">Project Title</option>
              <option value="description">Project Description</option>
            </>
          )}
          {activeSection === 'skills' && <option value="title">Skill Title</option>}
          {activeSection === 'testimonials' && (
            <>
              <option value="name">Name</option>
              <option value="feedback">Feedback</option>
            </>
          )}
          {activeSection === 'contact' && <option value="title">Contact Title</option>}
        </Form.Select>
      </Form.Group>

      <Button variant="light" onClick={handleSuggest} disabled={loading}>
        {loading ? 'Loading...' : 'Get AI Suggestion'}
      </Button>

      {error && <p className="mt-2 text-danger">{error}</p>}

      {suggestion && (
        <div className="mt-3">
          <p>{suggestion}</p>
          <Button variant="primary" onClick={applySuggestion}>
            Apply Suggestion
          </Button>
          <Button variant="outline-light" onClick={() => setSuggestion('')} className="ms-2">
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

export default AISuggestions;
