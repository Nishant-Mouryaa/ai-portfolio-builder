import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Badge, Modal } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

// TemplateCard component: shows a thumbnail with hover effects.
const TemplateCard = ({ template, isSelected, onSelect, onPreview, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div style={{ width: '100%', border: isSelected ? '2px solid #007bff' : 'none', borderRadius: '8px', overflow: 'hidden' }}>
        <img
          src={template.image}
          alt={`${template.name} template preview`}
          loading="lazy"
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <div className="p-3 text-center">
          <h5>
            {template.name} {isSelected && <Badge bg="primary">Selected</Badge>}
          </h5>
          <div className="d-flex justify-content-around">
            <Button
              variant="primary"
              onClick={() => onSelect(template)}
              aria-label={`Select the ${template.name} template`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => onPreview(template)}
              aria-label={`Preview the ${template.name} template`}
            >
              Preview
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

TemplateCard.propTypes = {
  template: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  index: PropTypes.number,
};

TemplateCard.defaultProps = {
  isSelected: false,
  index: 0,
};

const TemplateSelector = () => {
  const { userData, setUserData } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [modalTemplate, setModalTemplate] = useState(null);

  // Optionally display a loading state if userData is not available.
  if (!userData) {
    return (
      <Container className="p-4 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  // Example templates. Replace these with your actual template data.
  const templates = [
    { name: 'Minimal', image: '/templates/minimal.png' },
    { name: 'Creative', image: '/templates/creative.png' },
    { name: 'Professional', image: '/templates/professional.png' },
  ];

  // Update the selected template in context.
  const handleSelectTemplate = (template) => {
    setUserData((prev) => ({ ...prev, selectedTemplate: template }));
  };

  // Open the modal preview.
  const handlePreviewTemplate = (template) => {
    setModalTemplate(template);
    setShowModal(true);
  };

  // When the user confirms in the modal, apply the template.
  const handleApplyTemplate = () => {
    if (modalTemplate) {
      setUserData((prev) => ({ ...prev, selectedTemplate: modalTemplate }));
    }
    setShowModal(false);
  };

  // Determine the currently selected template.
  const selectedTemplateName = userData.selectedTemplate?.name;

  return (
    <Container className="p-4">
      <h3 className="text-center mb-4">Choose a Portfolio Template</h3>
      {/* Horizontally scrollable container */}
      <div className="d-flex overflow-auto" style={{ paddingBottom: '1rem' }}>
        {templates.map((template, index) => (
          <div key={template.name} className="flex-shrink-0 me-3" style={{ width: '300px' }}>
            <TemplateCard
              template={template}
              isSelected={selectedTemplateName === template.name}
              onSelect={handleSelectTemplate}
              onPreview={handlePreviewTemplate}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Modal for full-page template preview */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTemplate?.name} Template Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {modalTemplate && (
            <img
              src={modalTemplate.image}
              alt={`${modalTemplate.name} full preview`}
              className="img-fluid"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
              loading="lazy"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApplyTemplate}>
            Apply Template
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TemplateSelector;
