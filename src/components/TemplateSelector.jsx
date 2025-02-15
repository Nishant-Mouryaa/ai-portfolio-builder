// src/components/TemplateSelector.jsx
import React, { useRef, useEffect } from 'react';
import { Container, Button, Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { templates as predefinedTemplates } from '../data/templates';
import './TemplateSelector.css';

const TemplateSelector = () => {
  const { userData, setUserData } = usePortfolio();
  const scrollRef = useRef(null);

  if (!userData) {
    return (
      <Container className="p-4 text-center">
        <p>Loading templates...</p>
      </Container>
    );
  }

  const customTemplates = userData.customTemplates || [];
  const combinedTemplates = [...predefinedTemplates, ...customTemplates];

  useEffect(() => {
    if (userData && !userData.selectedTemplate) {
      const savedTemplateId = localStorage.getItem('selectedTemplateId');
      if (savedTemplateId) {
        const savedTemplate = combinedTemplates.find(t => t.id === savedTemplateId);
        if (savedTemplate) {
          setUserData(prev => ({ ...prev, selectedTemplate: savedTemplate }));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleSelectTemplate = (template) => {
    setUserData(prev => ({ ...prev, selectedTemplate: template }));
    localStorage.setItem('selectedTemplateId', template.id);
  };

  const selectedTemplateId = userData.selectedTemplate?.id;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const renderPopover = (template) => (
    <Popover id={`popover-${template.id}`}>
      <Popover.Header as="h3">{template.name} Preview</Popover.Header>
      <Popover.Body>
        <img
          src={template.image}
          alt={`${template.name} preview`}
          style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <Container className="template-selector p-4">
      <h3 className="text-center mb-4">Choose a Portfolio Template</h3>
      <div className="d-flex justify-content-between mb-2">
        <Button variant="outline-secondary" onClick={scrollLeft}>
          ←
        </Button>
        <Button variant="outline-secondary" onClick={scrollRight}>
          →
        </Button>
      </div>
      <div ref={scrollRef} className="template-scroll-container d-flex overflow-auto">
        {combinedTemplates.map((template, index) => (
          <OverlayTrigger key={template.id} trigger={['hover', 'focus']} placement="top" overlay={renderPopover(template)}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="template-card flex-shrink-0 me-3"
              style={{
                width: '300px',
                border: selectedTemplateId === template.id ? '2px solid #007bff' : '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={template.image}
                alt={`${template.name} template preview`}
                loading="lazy"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="p-3 text-center">
                <h5 className="mb-2">
                  {template.name}{' '}
                  {selectedTemplateId === template.id && <Badge bg="primary">Selected</Badge>}
                </h5>
                <Button variant="primary" onClick={() => handleSelectTemplate(template)}>
                  {selectedTemplateId === template.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </motion.div>
          </OverlayTrigger>
        ))}
      </div>
    </Container>
  );
};

export default TemplateSelector;
