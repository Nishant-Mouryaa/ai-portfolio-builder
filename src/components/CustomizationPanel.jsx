import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSettings = {
  font: 'Arial',
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
};

const CustomizationPanel = () => {
  const { settings, setSettings } = usePortfolio();
  const [showAlert, setShowAlert] = useState(false);
  const alertTimerRef = useRef(null);

  // If the settings context isn’t ready, show a loading indicator.
  if (!settings || !setSettings) {
    return <p>Loading...</p>;
  }

  // Handle changes in the form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Apply changes and show a success alert.
  const handleApplyChanges = (e) => {
    e.preventDefault();
    setShowAlert(true);
    // Clear any existing timer to prevent multiple timers
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 2000);
  };

  // Reset settings to their default values.
  const handleReset = () => {
    setSettings(defaultSettings);
    setShowAlert(true);
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }
    alertTimerRef.current = setTimeout(() => setShowAlert(false), 2000);
  };

  // Cleanup the timer on unmount.
  useEffect(() => {
    return () => {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
    };
  }, []);

  return (
    <Container className="p-4 border-start">
      <h3>Customize Portfolio</h3>
      
      {/* Animated Alert */}
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
                <Alert 
                  variant="success" 
                  dismissible 
                  onClose={() => setShowAlert(false)}
                >
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
          <Form.Select 
            name="font" 
            value={settings.font || defaultSettings.font} 
            onChange={handleChange}
          >
            <option value="Arial">Arial</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
          </Form.Select>
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
