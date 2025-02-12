// PortfolioTemplate.jsx
import React from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

// Variants for overall container and individual sections.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
};

const PortfolioTemplate = () => {
  const { userData, settings } = usePortfolio();

  if (!userData) {
    return (
      <Container fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" variant="primary" />
        <span className="visually-hidden">Loading...</span>
      </Container>
    );
  }

  // Destructure data from userData; add fallback values if needed.
  const { name, profession, bio, projects, contact, testimonials } = userData;

  // Build dynamic styles based on the settings from context.
  const previewStyle = {
    fontFamily: settings.font || 'Arial',
    fontSize: `${settings.fontSize || 16}px`,
    backgroundColor: settings.backgroundColor || '#ffffff',
    color: settings.textColor || '#000000',
    transition: 'all 0.3s ease',
  };

  return (
    <Container fluid className="p-0 portfolio-template-container" style={previewStyle}>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        {/* Header Section */}
        <section
          id="header"
          className="py-5 text-center"
          style={{ backgroundColor: settings.primaryColor || '#007bff' }}
        >
          <Container>
            <h1 className="display-4">{name || 'Your Name'}</h1>
            <p className="lead">{profession || 'Your Profession'}</p>
          </Container>
        </section>

        {/* About Section */}
        <motion.section id="about" className="py-5" variants={sectionVariants}>
          <Container>
            <h2>About Me</h2>
            <p>{bio || 'This is your portfolio bio. Edit it to add details about yourself.'}</p>
          </Container>
        </motion.section>

        {/* Projects Section */}
        <motion.section id="projects" className="py-5 bg-light" variants={sectionVariants}>
          <Container>
            <h2>Projects</h2>
            {Array.isArray(projects) && projects.length > 0 ? (
              <Row>
                {projects.map((project, index) => (
                  <Col key={project.id || index} md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{project.title}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No projects added yet.</p>
            )}
          </Container>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" className="py-5" variants={sectionVariants}>
          <Container>
            <h2>Contact</h2>
            <p>{contact || 'Your contact information goes here.'}</p>
          </Container>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section id="testimonials" className="py-5 bg-light" variants={sectionVariants}>
          <Container>
            <h2>Testimonials</h2>
            {testimonials && testimonials.length > 0 ? (
              <Row>
                {testimonials.map((testimonial, index) => (
                  <Col key={index} md={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Text>"{testimonial.message}"</Card.Text>
                        <Card.Footer>
                          <small>- {testimonial.author}</small>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No testimonials added yet.</p>
            )}
          </Container>
        </motion.section>
      </motion.div>
    </Container>
  );
};

export default PortfolioTemplate;
 
