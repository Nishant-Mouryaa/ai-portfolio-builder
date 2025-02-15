import React from 'react';
import './EditorPanel.css';
import { usePortfolio } from '../context/PortfolioContext';

function EditorPanel() {
  const { state, dispatch } = usePortfolio();
  const { sections, activeSection } = state;
  const sectionData = sections[activeSection] || {};

  // Generic handler for updating the current active section
  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: {
        section: activeSection,
        data: { [field]: value },
      },
    });
  };

  return (
    <div className="editor-panel bg-dark text-white p-3">
      <h5 className="mb-3">Editor Panel</h5>
      <hr className="bg-secondary" />

      {activeSection === 'hero' && (
        <>
          <div className="editor-field mb-3">
            <label className="form-label">Hero Title</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div className="editor-field mb-3">
            <label className="form-label">Subtitle</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
            />
          </div>
        </>
      )}

      {activeSection === 'projects' && (
        <>
          <div className="editor-field mb-3">
            <label className="form-label">Projects Title</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          {/* Add a sub-component or logic to handle project items */}
        </>
      )}

      {/* Repeat pattern for skills, testimonials, contact, etc. */}
      {activeSection === 'skills' && (
        <>
          <div className="editor-field mb-3">
            <label className="form-label">Skills Title</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
        </>
      )}

      {activeSection === 'testimonials' && (
        <>
          <div className="editor-field mb-3">
            <label className="form-label">Testimonials Title</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
        </>
      )}

      {activeSection === 'contact' && (
        <>
          <div className="editor-field mb-3">
            <label className="form-label">Contact Title</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={sectionData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EditorPanel;
