import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

// Separate component for each template card
const TemplateCard = ({ template, isSelected, onSelect, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={`shadow-sm ${isSelected ? 'border-primary' : ''}`}>
        <Card.Img
          variant="top"
          src={template.image}
          alt={`${template.name} template preview`}
        />
        <Card.Body className="text-center">
          <Card.Title>
            {template.name}{' '}
            {isSelected && <Badge bg="primary">Selected</Badge>}
          </Card.Title>
          <Button
            variant="primary"
            onClick={() => onSelect(template)}
            aria-label={`Select the ${template.name} template`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </Card.Body>
      </Card>
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
  index: PropTypes.number,
};

TemplateCard.defaultProps = {
  isSelected: false,
  index: 0,
};

const TemplateSelector = () => {
  const { userData, setUserData } = usePortfolio();

  // Optionally handle a loading state if userData hasn't loaded yet
  if (!userData) {
    return (
      <Container className="p-4 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  // Example templates. Replace with real data as needed.
  const templates = [
    { name: 'Minimal', image: '/templates/minimal.png' },
    { name: 'Creative', image: '/templates/creative.png' },
    { name: 'Professional', image: '/templates/professional.png' },
  ];

  const handleSelectTemplate = (template) => {
    setUserData((prev) => ({ ...prev, selectedTemplate: template }));
  };

  // Determine the currently selected template (if any)
  const selectedTemplateName = userData.selectedTemplate?.name;

  return (
    <Container className="p-4">
      <h3 className="text-center mb-4">Choose a Portfolio Template</h3>
      <Row>
        {templates.map((template, index) => (
          <Col key={template.name} md={4} className="mb-4">
            <TemplateCard
              template={template}
              isSelected={selectedTemplateName === template.name}
              onSelect={handleSelectTemplate}
              index={index}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TemplateSelector;
