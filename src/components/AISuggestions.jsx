// components/AISuggestions.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import './AISuggestions.css';

function AISuggestions() {
  const { state, dispatch } = usePortfolio();
  const { activeSection, sections } = state;
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  // Function to simulate an API call for AI suggestions
  const handleSuggest = async () => {
    setLoading(true);
    const currentSection = sections[activeSection];
    // Build a prompt (in a real app, you might use this prompt to call an AI API)
    const prompt = `Suggest content for the ${activeSection} section. Current content: ${JSON.stringify(
      currentSection
    )}`;

    // Simulate an API call with a timeout (replace with your API call)
    setTimeout(() => {
      let fakeSuggestion = '';
      switch (activeSection) {
        case 'hero':
          fakeSuggestion =
            "AI Suggestion: Welcome to my innovative portfolio. I'm a creative developer with a passion for cutting-edge technologies.";
          break;
        case 'projects':
          fakeSuggestion =
            "AI Suggestion: Showcase your best work—each project should tell a story and highlight your unique skills.";
          break;
        case 'skills':
          fakeSuggestion =
            "AI Suggestion: Highlight your core competencies and technical expertise, along with proficiency levels.";
          break;
        case 'testimonials':
          fakeSuggestion =
            "AI Suggestion: Let your satisfied clients speak for you with heartfelt testimonials that build trust.";
          break;
        case 'contact':
          fakeSuggestion =
            "AI Suggestion: Make it easy to connect with you—provide clear contact details and a friendly call-to-action.";
          break;
        default:
          fakeSuggestion = "AI Suggestion: Update your content here.";
      }
      setSuggestion(fakeSuggestion);
      setLoading(false);
    }, 1500);
  };

  // Function to apply the suggestion (for example, update the title field)
  const applySuggestion = () => {
    // Here we simply update the title of the current section with the suggestion.
    // In a real scenario, you could apply suggestions to multiple fields.
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: {
        section: activeSection,
        data: { title: suggestion },
      },
    });
    setSuggestion('');
  };

  return (
    <div className="ai-suggestions p-3 bg-secondary text-white rounded">
      <h5>
        AI Suggestions for {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h5>
      <Button variant="light" onClick={handleSuggest} disabled={loading}>
        {loading ? 'Loading...' : 'Get AI Suggestion'}
      </Button>
      {suggestion && (
        <div className="mt-3">
          <p>{suggestion}</p>
          <Button variant="primary" onClick={applySuggestion}>
            Apply Suggestion
          </Button>
        </div>
      )}
    </div>
  );
}

export default AISuggestions;
 
 
