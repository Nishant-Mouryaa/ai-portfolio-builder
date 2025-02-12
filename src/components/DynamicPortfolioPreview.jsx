// src/components/DynamicPortfolioPreview.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const DynamicPortfolioPreview = () => {
  const { userData, settings } = usePortfolio();

  if (!userData) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <p>Loading...</p>
      </Container>
    );
  }

  // Destructure user data and selected template.
  const {
    name,
    profession,
    bio,
    projects,
    contact,
    testimonials,
    skills,
    selectedTemplate,
  } = userData;

  // Define a default template object with updated section order.
  const defaultTemplate = {
    font: 'Arial, sans-serif',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    // Order includes hero and skills sections.
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {},
  };

  // Merge the default template with the selected template (if any).
  const template = { ...defaultTemplate, ...selectedTemplate };

  // Build a preview style based on the selected template.
  const previewStyle = {
    fontFamily: template.font,
    backgroundColor: template.backgroundColor,
    color: settings.textColor || '#000000',
    transition: 'all 0.3s ease',
  };

  // Animation variants for sections.
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Render each section based on the sectionOrder.
  const renderSection = (section) => {
    switch (section) {
      case 'hero':
        return (
          <section
            id="hero"
            style={{
              padding: '5rem 0',
              background: `linear-gradient(135deg, ${template.primaryColor} 0%, ${template.backgroundColor} 100%)`,
              color: '#ffffff',
            }}
          >
            <Container className="text-center">
              <motion.h1 variants={sectionVariants} initial="hidden" animate="visible" className="display-3">
                {name || 'Your Name'}
              </motion.h1>
              <motion.p variants={sectionVariants} initial="hidden" animate="visible" className="lead">
                {profession || 'Your Profession'}
              </motion.p>
              <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-4">
                <Button variant="light" size="lg" className="me-2">
                  Hire Me
                </Button>
                <Button variant="outline-light" size="lg">
                  Download CV
                </Button>
              </motion.div>
            </Container>
          </section>
        );
      case 'about':
        return (
          <section id="about" style={{ padding: '3rem 0', ...template.styles.about }}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                About Me
              </motion.h2>
              <motion.p variants={sectionVariants} initial="hidden" animate="visible">
                {bio || 'Your biography goes here. Tell your story and highlight your journey.'}
              </motion.p>
            </Container>
          </section>
        );
      case 'projects':
        return (
          <section id="projects" style={{ padding: '3rem 0', ...template.styles.projects }}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Projects
              </motion.h2>
              {projects && projects.length > 0 ? (
                <Row>
                  {projects.map((project, idx) => (
                    <Col key={project.id || idx} md={4} className="mb-4">
                      <motion.div
                        whileHover={{ scale: 1.03, boxShadow: '0px 0px 12px rgba(0,0,0,0.2)' }}
                        transition={{ duration: 0.3 }}
                        className="p-3 border rounded h-100"
                      >
                        <h5>{project.title}</h5>
                        <p>{project.description}</p>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No projects available.</p>
              )}
            </Container>
          </section>
        );
      case 'skills':
        return (
          <section id="skills" style={{ padding: '3rem 0', ...template.styles.skills }}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Skills & Technologies
              </motion.h2>
              {skills && skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-3"
                  >
                    <h5>{skill.name}</h5>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${skill.proficiency}%` }}
                        aria-valuenow={skill.proficiency}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {skill.proficiency}%
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </Container>
          </section>
        );
      case 'testimonials':
        return (
          <section id="testimonials" style={{ padding: '3rem 0', ...template.styles.testimonials }}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Testimonials
              </motion.h2>
              {testimonials && testimonials.length > 0 ? (
                <Row>
                  {testimonials.map((item, idx) => (
                    <Col key={idx} md={4} className="mb-4">
                      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="p-3 border rounded">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={`Client ${idx}`}
                            className="img-fluid rounded-circle mb-2"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        )}
                        <p>"{item.message}"</p>
                        <small>- {item.author}</small>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>No testimonials available.</p>
              )}
            </Container>
          </section>
        );
      case 'contact':
        return (
          <section id="contact" style={{ padding: '3rem 0', ...template.styles.contact }}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4 text-center">
                Contact
              </motion.h2>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3" controlId="contactName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Your Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Your Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="contactMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={4} placeholder="Your Message" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Send Message
                    </Button>
                  </Form>
                </Col>
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                  <h5>Follow Me</h5>
                  <div>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="bi bi-linkedin" style={{ fontSize: '2rem' }}></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="bi bi-twitter" style={{ fontSize: '2rem' }}></i>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="me-2">
                      <i className="bi bi-github" style={{ fontSize: '2rem' }}></i>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="p-0" style={previewStyle}>
      {template.sectionOrder.map((section) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderSection(section)}
        </motion.div>
      ))}
    </Container>
  );
};

export default DynamicPortfolioPreview;
