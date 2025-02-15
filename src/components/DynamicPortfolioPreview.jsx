// src/components/DynamicPortfolioPreview.jsx
import React from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './DynamicPortfolioPreview.css';

const DynamicPortfolioPreview = () => {
  const { userData, settings } = usePortfolio();

  if (!userData) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center preview-loading"
      >
        <p>Loading...</p>
      </Container>
    );
  }

  const {
    name,
    profession,
    bio,
    projects,
    contact,
    testimonials,
    skills,
    selectedTemplate,
    profilePhoto,
    socialLinks = {}
  } = userData;

  const defaultTemplate = {
    font: 'Arial, sans-serif',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {},
  };

  const template = {
    ...defaultTemplate,
    ...selectedTemplate,
    sectionOrder: Array.from(
      new Set([...defaultTemplate.sectionOrder, ...(selectedTemplate?.sectionOrder || [])])
    ),
  };

  const previewStyle = {
    fontFamily: template.font,
    backgroundColor: template.backgroundColor,
    color: settings.textColor || '#000000',
    transition: 'all 0.3s ease',
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const renderSocialIcons = () => {
    const icons = [];
    if (socialLinks.linkedin) {
      icons.push(
        <a
          key="linkedin"
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon me-2"
        >
          <FaLinkedin size={28} />
        </a>
      );
    }
    if (socialLinks.github) {
      icons.push(
        <a
          key="github"
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon me-2"
        >
          <FaGithub size={28} />
        </a>
      );
    }
    if (socialLinks.twitter) {
      icons.push(
        <a
          key="twitter"
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon me-2"
        >
          <FaTwitter size={28} />
        </a>
      );
    }
    return icons;
  };

  const renderSection = (section) => {
    switch (section) {
      case 'hero':
        return (
          <section
            id="hero"
            className="preview-hero"
            style={{
              background: `linear-gradient(135deg, ${template.primaryColor} 0%, ${template.backgroundColor} 100%)`,
            }}
          >
            <Container>
              <Row className="align-items-center">
                <Col md={8}>
                  <motion.h1 variants={sectionVariants} initial="hidden" animate="visible" className="display-3 preview-title">
                    {name || 'Your Name'}
                  </motion.h1>
                  <motion.p variants={sectionVariants} initial="hidden" animate="visible" className="lead preview-subtitle">
                    {profession || 'Your Profession'}
                  </motion.p>
                  <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-3 social-icons-container">
                    {renderSocialIcons()}
                  </motion.div>
                  <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-4 preview-cta">
                    <Button variant="light" size="lg" className="me-2">
                      Hire Me
                    </Button>
                    <Button variant="outline-light" size="lg">
                      Download CV
                    </Button>
                  </motion.div>
                </Col>
                <Col md={4} className="text-center">
                  {profilePhoto && (
                    <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="hero-profile-photo mb-3">
                      <Image src={profilePhoto} alt="Profile" roundedCircle fluid className="profile-photo" />
                    </motion.div>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        );
      case 'about':
        return (
          <section id="about" className="preview-about" style={template.styles.about}>
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
          <section id="projects" className="preview-projects" style={template.styles.projects}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Projects
              </motion.h2>
              {projects && projects.length > 0 ? (
                <Row>
                  {projects.map((project, idx) => (
                    <Col key={project.id || idx} md={4} className="mb-4">
                      <motion.div whileHover={{ scale: 1.03, boxShadow: '0px 0px 12px rgba(0,0,0,0.2)' }} transition={{ duration: 0.3 }} className="project-card p-3 rounded">
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
          <section id="skills" className="preview-skills" style={template.styles.skills}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Skills & Technologies
              </motion.h2>
              {skills && skills.length > 0 ? (
                skills.map((skill, idx) => (
                  <motion.div key={idx} variants={sectionVariants} initial="hidden" animate="visible" className="skill-item mb-3">
                    <h5>{skill.name}</h5>
                    <div className="progress skill-progress">
                      <div className="progress-bar" role="progressbar" style={{ width: `${skill.proficiency}%` }} aria-valuenow={skill.proficiency} aria-valuemin="0" aria-valuemax="100">
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
          <section id="testimonials" className="preview-testimonials" style={template.styles.testimonials}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4">
                Testimonials
              </motion.h2>
              {testimonials && testimonials.length > 0 ? (
                <Row>
                  {testimonials.map((item, idx) => (
                    <Col key={idx} md={4} className="mb-4">
                      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="testimonial-card p-3 rounded">
                        {item.image && (
                          <img src={item.image} alt={`Client ${idx}`} className="img-fluid rounded-circle testimonial-img mb-2" />
                        )}
                        <p>"{item.message}"</p>
                        <small className="d-block">- {item.author}</small>
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
          <section id="contact" className="preview-contact" style={template.styles.contact}>
            <Container>
              <motion.h2 variants={sectionVariants} initial="hidden" animate="visible" className="mb-4 text-center">
                Contact
              </motion.h2>
              <Row>
                <Col md={6}>
                  <Form className="contact-form">
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
                  <div className="social-links">
                    {renderSocialIcons()}
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
    <Container fluid className="dynamic-portfolio-preview p-0" style={previewStyle}>
      {template.sectionOrder.map((section) => (
        <motion.div key={section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {renderSection(section)}
        </motion.div>
      ))}
    </Container>
  );
};

export default DynamicPortfolioPreview;
