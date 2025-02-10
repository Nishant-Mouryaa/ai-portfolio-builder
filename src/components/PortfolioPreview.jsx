import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const projectVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.1 },
  }),
};

const ProjectItem = ({ project, index }) => (
  <motion.div
    custom={index}
    variants={projectVariants}
    initial="hidden"
    animate="visible"
    className="border p-3 my-2 rounded"
  >
    <h5>{project.title}</h5>
    <p>{project.description}</p>
  </motion.div>
);

const PortfolioPreview = () => {
  const { userData, settings } = usePortfolio();

  if (!userData) {
    return (
      <Container
        fluid
        className="p-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" variant="primary" role="status" aria-hidden="true" />
        <span className="visually-hidden">Loading...</span>
      </Container>
    );
  }

  const { name, profession, bio, projects, selectedTemplate } = userData;

  // Apply customization settings including font size.
  const previewStyle = {
    fontFamily: settings.font,
    fontSize: `${settings.fontSize}px`,
    backgroundColor: settings.backgroundColor,
    transition: 'all 0.3s ease',
  };

  // Optionally override the preview look based on a selected template.
  let templateStyle = {};
  if (selectedTemplate) {
    switch (selectedTemplate.name) {
      case 'Minimal':
        templateStyle = { border: '3px solid #007bff' };
        break;
      case 'Creative':
        templateStyle = { border: '3px solid #ff5722' };
        break;
      case 'Professional':
        templateStyle = { border: '3px solid #333' };
        break;
      default:
        templateStyle = {};
    }
  }

  const headingStyle = {
    color: settings.primaryColor,
  };

  return (
    <Container fluid className="p-4" style={previewStyle}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-center mb-3">Live Portfolio Preview</h3>
        <Card className="shadow-lg p-4" style={{ ...templateStyle, backgroundColor: settings.backgroundColor }}>
          <Card.Body>
            <h2 style={headingStyle}>{name || 'Your Name'}</h2>
            <h5 style={headingStyle}>{profession || 'Your Profession'}</h5>
            <p>{bio || 'This is your portfolio bio. Edit it to add details about yourself.'}</p>
            <h4 className="mt-4">Projects</h4>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectItem key={project.id || index} project={project} index={index} />
              ))
            ) : (
              <p>No projects added yet.</p>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default PortfolioPreview;
