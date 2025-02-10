import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

// Default settings including a new fontSize property.
const defaultSettings = {
  font: 'Arial',
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
  fontSize: 16, // in pixels
};

const CustomizationPanel = () => {
  const { settings, setSettings } = usePortfolio();
  const [showAlert, setShowAlert] = useState(false);
  const alertTimerRef = useRef(null);

  // If the settings context isn’t ready, show a loading indicator.
  if (!settings || !setSettings) {
    return <p>Loading...</p>;
  }

  // Handle generic changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle font size changes (ensure conversion to number).
  const handleFontSizeChange = (e) => {
    setSettings((prev) => ({ ...prev, fontSize: parseInt(e.target.value, 10) }));
  };

  // Apply changes and show a success alert.
  const handleApplyChanges = (e) => {
    e.preventDefault();
    setShowAlert(true);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 2000);
  };

  // Reset settings to defaults.
  const handleReset = () => {
    setSettings(defaultSettings);
    setShowAlert(true);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 2000);
  };

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, []);

  return (
    <Container className="p-4 border-start">
      <h3>Customize Portfolio</h3>
      
      {/* Animated Success Alert */}
      <Row className="mb-3">
        <Col>
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Changes Applied!
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Col>
      </Row>

      <Form onSubmit={handleApplyChanges}>
        <Form.Group className="mb-3">
          <Form.Label>Font Style</Form.Label>
          <Form.Select name="font" value={settings.font || defaultSettings.font} onChange={handleChange}>
            <option value="Arial">Arial</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Font Size: {settings.fontSize}px</Form.Label>
          <Form.Control
            type="range"
            name="fontSize"
            min="10"
            max="36"
            value={settings.fontSize}
            onChange={handleFontSizeChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Primary Color</Form.Label>
          <Form.Control
            type="color"
            name="primaryColor"
            value={settings.primaryColor || defaultSettings.primaryColor}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Background Color</Form.Label>
          <Form.Control
            type="color"
            name="backgroundColor"
            value={settings.backgroundColor || defaultSettings.backgroundColor}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            Apply Changes
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Reset to Default
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CustomizationPanel;
