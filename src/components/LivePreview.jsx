// components/LivePreview.js
import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Form, Button } from 'react-bootstrap';
import { usePortfolio } from '../context/PortfolioContext';
import './LivePreview.css';

// Import programming language icons from react-icons
import { 
  SiJavascript, 
  SiPython, 
  SiCplusplus, 
  SiRuby, 
  SiPhp, 
  SiGo, 
  SiTypescript 
} from 'react-icons/si';

// Mapping from icon key to component
const languageIcons = {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiRuby,
  SiPhp,
  SiGo,
  SiTypescript,
};

function LivePreview() {
  const { state } = usePortfolio();
  const { sections, user, fontFamily, colors, template } = state;
  const hero = sections.hero;
  const projectsSection = sections.projects;
  const skillsSection = sections.skills;
  const testimonialsSection = sections.testimonials;
  const contactSection = sections.contact;

  // Static social links
  const socialLinks = [
    { iconClass: 'bi-github', url: 'https://github.com/username' },
    { iconClass: 'bi-linkedin', url: 'https://www.linkedin.com/in/username/' },
  ];

  const selectedTemplate = template || 'modern'; // default to 'modern' if template is undefined

  return (
    <div
      className={`live-preview template-${selectedTemplate.toLowerCase()}`}
      style={{
        fontFamily: fontFamily,
        '--primary-color': colors.primary,
        '--accent-color': colors.accent,
      }}
    >
      <Container fluid className="p-0">
        {/* HERO SECTION */}
        <section id="hero" className="hero-section position-relative text-white">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col md={8} className="mx-auto text-center">
                <div className="hero-text">
                  <h1 className="display-3 fw-bold">{hero.title}</h1>
                  <p className="lead">{hero.subtitle}</p>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="text-white social-icon"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className={`bi ${link.iconClass} fs-2`}></i>
                      </a>
                    ))}
                  </div>
                  <Button variant="primary" className="mt-4">
                    Hire Me
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="projects-section py-5">
          <Container>
            <h2 className="section-title mb-4 text-center">{projectsSection.title}</h2>
            <Row>
              {projectsSection.items.map((project, idx) => (
                <Col md={4} className="mb-4" key={idx}>
                  <Card className="project-card border-0 h-100">
                    <div className="project-image-wrapper overflow-hidden">
                      <Card.Img variant="top" src={project.image} className="project-image" />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{project.title}</Card.Title>
                      <Card.Text>{project.description}</Card.Text>
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="skills-section py-5 bg-light text-dark">
          <Container>
            <h2 className="section-title mb-4 text-center">{skillsSection.title}</h2>
            <Row>
              {skillsSection.items.map((skill, idx) => (
                <Col md={6} className="mb-3" key={idx}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      {skill.icon && languageIcons[skill.icon] ? (
                        <span className="me-2">
                          {React.createElement(languageIcons[skill.icon], { size: '1.5em' })}
                        </span>
                      ) : null}
                      <strong>{skill.name}</strong>
                      <small className="text-muted ms-1">({skill.category})</small>
                    </span>
                    <span>{skill.level}%</span>
                  </div>
                  <ProgressBar now={skill.level} className="progress-skill" />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="testimonials-section py-5">
          <Container>
            <h2 className="section-title mb-4 text-center">{testimonialsSection.title}</h2>
            <Row>
              {testimonialsSection.items.map((testi, idx) => (
                <Col md={6} className="mb-4" key={idx}>
                  <Card className="testimonial-card border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={testi.image}
                          alt={testi.name}
                          className="rounded-circle me-3"
                          width="60"
                          height="60"
                        />
                        <h5 className="mb-0">{testi.name}</h5>
                      </div>
                      <Card.Text className="fst-italic">"{testi.feedback}"</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact-section py-5 bg-light">
          <Container>
            <h2 className="section-title mb-4 text-center">{contactSection.title}</h2>
            <Row>
              <Col md={6}>
                <Form className="contact-form p-4">
                  <Form.Group className="mb-3" controlId="contactName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contactEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="contactMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Your message..." />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </Form>
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center">
                <h5 className="mb-3">Connect with me</h5>
                <div className="d-flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-dark fs-3 social-icon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={`bi ${link.iconClass}`}></i>
                    </a>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
}

export default LivePreview;
