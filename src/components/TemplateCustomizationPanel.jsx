// src/components/TemplateCustomizationPanel.jsx
import React, { useState, useContext } from 'react';
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PortfolioContext } from '../context/PortfolioContext';

// Available fonts for selection.
const availableFonts = [
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  // Add additional fonts as needed.
];

const TemplateCustomizationPanel = () => {
  const { userData, setUserData } = useContext(PortfolioContext);

  // For custom template creation.
  const [customTemplateModal, setCustomTemplateModal] = useState(false);
  const [customTemplateName, setCustomTemplateName] = useState('');
  const [customTemplateImage, setCustomTemplateImage] = useState(null);

  // For section reordering; assume userData.sections is an array of section keys.
  const initialSections = userData.sections || ['header', 'about', 'projects', 'contact', 'testimonials'];
  const [sections, setSections] = useState(initialSections);

  // --- Handlers for Font and Color Customization ---

  const handleFontChange = (e) => {
    const font = e.target.value;
    setUserData((prev) => ({ ...prev, templateFont: font }));
  };

  const handlePrimaryColorChange = (e) => {
    const primaryColor = e.target.value;
    setUserData((prev) => ({ ...prev, primaryColor }));
  };

  const handleSecondaryColorChange = (e) => {
    const secondaryColor = e.target.value;
    setUserData((prev) => ({ ...prev, secondaryColor }));
  };

  // --- Section Reordering via Drag and Drop ---

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newSections = Array.from(sections);
    const [movedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, movedItem);
    setSections(newSections);
    // Update global state if desired.
    setUserData((prev) => ({ ...prev, sections: newSections }));
  };

  // --- Custom Template Upload ---

  const handleCustomTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomTemplateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomTemplate = () => {
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: customTemplateName,
      image: customTemplateImage,
      font: userData.templateFont || 'Arial, sans-serif',
      primaryColor: userData.primaryColor || '#007bff',
      secondaryColor: userData.secondaryColor || '#ffffff',
      sections: sections,
      // Add any additional attributes if needed.
    };
    // Store new custom templates in a separate array (or append to available templates).
    setUserData((prev) => ({
      ...prev,
      customTemplates: prev.customTemplates ? [...prev.customTemplates, newTemplate] : [newTemplate],
      selectedTemplate: newTemplate,
    }));
    setCustomTemplateModal(false);
    setCustomTemplateName('');
    setCustomTemplateImage(null);
  };

  return (
    <Container className="p-4">
      <h3>Customize Your Template</h3>
      <Form>
        {/* Font Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Font Selection</Form.Label>
          <Form.Select onChange={handleFontChange} value={userData.templateFont || 'Arial, sans-serif'}>
            {availableFonts.map((font, index) => (
              <option key={index} value={font.value}>{font.label}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Color Customization */}
        <Form.Group className="mb-3">
          <Form.Label>Primary Color</Form.Label>
          <Form.Control
            type="color"
            onChange={handlePrimaryColorChange}
            value={userData.primaryColor || '#007bff'}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Secondary Color</Form.Label>
          <Form.Control
            type="color"
            onChange={handleSecondaryColorChange}
            value={userData.secondaryColor || '#ffffff'}
          />
        </Form.Group>

        {/* Section Reordering */}
        <Form.Group className="mb-3">
          <Form.Label>Reorder Sections</Form.Label>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {sections.map((section, index) => (
                    <Draggable key={section} draggableId={section} index={index}>
                      {(provided) => (
                        <ListGroup.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </ListGroup.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </Form.Group>

        {/* Custom Template Support */}
        <Form.Group className="mb-3">
          <Form.Label>Create / Upload Custom Template</Form.Label>
          <Form.Control
            type="text"
            placeholder="Template Name"
            value={customTemplateName}
            onChange={(e) => setCustomTemplateName(e.target.value)}
          />
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleCustomTemplateUpload}
            className="mt-2"
          />
          <Button variant="success" className="mt-2" onClick={() => setCustomTemplateModal(true)}>
            Save Custom Template
          </Button>
        </Form.Group>
      </Form>

      {/* Modal for confirming custom template creation */}
      <Modal show={customTemplateModal} onHide={() => setCustomTemplateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Custom Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to save this custom template?</p>
          {customTemplateImage && (
            <img
              src={customTemplateImage}
              alt="Custom Template Preview"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover'
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCustomTemplateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCustomTemplate}>
            Save Template
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TemplateCustomizationPanel;
 
