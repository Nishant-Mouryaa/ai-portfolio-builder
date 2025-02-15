import React from 'react';
import PropTypes from 'prop-types';
import './SectionReorder.css';

function SectionReorder({ sections, onReorder }) {
  // Implement or integrate a drag-and-drop solution here
  // This is a placeholder for demonstration
  return (
    <div className="section-reorder">
      <h6>Reorder Sections (Coming Soon)</h6>
      <ul>
        {Object.keys(sections).map((key) => (
          <li key={key}>{key.toUpperCase()}</li>
        ))}
      </ul>
    </div>
  );
}

SectionReorder.propTypes = {
  sections: PropTypes.object.isRequired,
  onReorder: PropTypes.func.isRequired,
};

export default SectionReorder;
 
