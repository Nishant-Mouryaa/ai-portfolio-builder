import React from 'react';
import './CustomizationPanel.css';
import { usePortfolio } from '../context/PortfolioContext';

function CustomizationPanel() {
  const { state, dispatch } = usePortfolio();
  const { fontFamily, colors } = state;

  const handleFontChange = (e) => {
    dispatch({ type: 'UPDATE_FONT_FAMILY', payload: e.target.value });
  };

  const handleColorChange = (key, value) => {
    dispatch({ type: 'UPDATE_COLOR', payload: { key, value } });
  };

  return (
    <div className="customization-panel bg-dark text-white p-3 mt-3">
      <h5>Customization Panel</h5>
      <hr className="bg-secondary" />

      <div className="mb-3">
        <label className="form-label">Font Family</label>
        <select
          className="form-select bg-dark text-white border-secondary"
          value={fontFamily}
          onChange={handleFontChange}
        >
          <option value="Roboto">Roboto</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          {/* Add your desired fonts */}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Primary Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={colors.primary}
          onChange={(e) => handleColorChange('primary', e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Accent Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          value={colors.accent}
          onChange={(e) => handleColorChange('accent', e.target.value)}
        />
      </div>

      {/* Placeholder for section reordering */}
      <div className="mt-4">
        <label className="form-label">Reorder Sections</label>
        <ul className="list-group bg-dark">
          <li className="list-group-item bg-dark text-white border-secondary">
            Hero
          </li>
          <li className="list-group-item bg-dark text-white border-secondary">
            Projects
          </li>
          <li className="list-group-item bg-dark text-white border-secondary">
            Skills
          </li>
          <li className="list-group-item bg-dark text-white border-secondary">
            Testimonials
          </li>
          <li className="list-group-item bg-dark text-white border-secondary">
            Contact
          </li>
        </ul>
        {/* In a real app, you might integrate something like react-beautiful-dnd */}
      </div>
    </div>
  );
}

export default CustomizationPanel;
