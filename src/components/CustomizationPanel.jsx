// components/CustomizationPanel.jsx
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './CustomizationPanel.css';
import { usePortfolio } from '../context/PortfolioContext';

function CustomizationPanel() {
  const { state, dispatch } = usePortfolio();
  const { fontFamily, colors, fontSize, theme } = state;

  const handleFontChange = (e) => {
    dispatch({ type: 'UPDATE_FONT_FAMILY', payload: e.target.value });
  };

  const handleColorChange = (key, value) => {
    dispatch({ type: 'UPDATE_COLOR', payload: { key, value } });
  };

  const handleFontSizeChange = (e) => {
    dispatch({ type: 'UPDATE_FONT_SIZE', payload: parseInt(e.target.value) });
  };

  const handleThemeChange = (e) => {
    dispatch({ type: 'UPDATE_THEME', payload: e.target.value });
  };

  const handleResetCustomizations = () => {
    dispatch({ type: 'RESET_CUSTOMIZATIONS' });
  };

  return (
    <div className="customization-panel bg-dark text-white p-3 mt-3">
      <h5>Customization Panel</h5>
      <hr className="bg-secondary" />

      <Form.Group className="mb-3">
        <Form.Label>Font Family</Form.Label>
        <Form.Select
          className="bg-dark text-white border-secondary"
          value={fontFamily}
          onChange={handleFontChange}
        >
          <option value="Roboto">Roboto</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
          {/* Add additional fonts as desired */}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Primary Color</Form.Label>
        <Form.Control
          type="color"
          className="form-control form-control-color"
          value={colors.primary}
          onChange={(e) => handleColorChange('primary', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Accent Color</Form.Label>
        <Form.Control
          type="color"
          className="form-control form-control-color"
          value={colors.accent}
          onChange={(e) => handleColorChange('accent', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Font Size (px)</Form.Label>
        <Form.Range
          min="12"
          max="24"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
        <div>{fontSize}px</div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Theme Mode</Form.Label>
        <Form.Select
          className="bg-dark text-white border-secondary"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </Form.Select>
      </Form.Group>

      <div className="mb-3">
        <Button variant="secondary" onClick={handleResetCustomizations}>
          Reset Customizations
        </Button>
      </div>

      {/* Placeholder for section reordering */}
      <div className="mt-4">
        <Form.Label>Reorder Sections</Form.Label>
        <ul className="list-group bg-dark">
          <li className="list-group-item bg-dark text-white border-secondary">Hero</li>
          <li className="list-group-item bg-dark text-white border-secondary">Projects</li>
          <li className="list-group-item bg-dark text-white border-secondary">Skills</li>
          <li className="list-group-item bg-dark text-white border-secondary">Testimonials</li>
          <li className="list-group-item bg-dark text-white border-secondary">Contact</li>
        </ul>
        {/* For real reordering, consider integrating react-beautiful-dnd */}
      </div>
    </div>
  );
}

export default CustomizationPanel;
