import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Form, Button } from 'react-bootstrap';
import './LivePreview.css'; // We'll define some additional hover/transition styles here

function LivePreview() {
  // Placeholder data for demonstration:
  const userName = 'John Doe';
  const userProfession = 'Full Stack Developer';
  const userImage = 'https://i.postimg.cc/JhmWc727/DALL-E-2025-01-15-23-43-34-A-single-person-smiling-confidently-ideal-for-a-testimonial-page-The.webp';
  const socialLinks = [
    { iconClass: 'bi-github', url: 'https://github.com/username' },
    { iconClass: 'bi-linkedin', url: 'https://www.linkedin.com/in/username/' },
    // Add more as needed
  ];

  const projects = [
    {
      title: 'Portfolio Template',
      description: 'A portfolio Template for free to showcase your skills.',
      image: 'https://i.postimg.cc/j5dkQcc4/Portfolio-Preview-1.png',
    },
    {
      title: 'Mockup for Builder',
      description: 'A mockup for portfolio builder UI',
      image: 'https://i.postimg.cc/0jzWhNL6/Belder-Web-Builder-Dashboard.jpg',
    },
    {
      title: 'Ecommmerce',
      description: 'A full stack Ecommmerce website.',
      image: 'https://i.postimg.cc/x1vswhFP/banner.png',
    },
  ];

  const skills = [
    { category: 'Front-End', name: 'React', level: 80 },
    { category: 'Front-End', name: 'Bootstrap', level: 90 },
    { category: 'Back-End', name: 'Node.js', level: 70 },
    { category: 'Back-End', name: 'Express', level: 65 },
  ];

  const testimonials = [
    {
      name: 'Jane Smith',
      feedback:
        'John delivered the project on time and exceeded our expectations. Highly recommend!',
      image: 'https://i.postimg.cc/Qtt0WtN6/DALL-E-2025-01-15-23-49-55-A-single-female-person-smiling-confidently-ideal-for-a-testimonial-pag.webp',
    },
    {
      name: 'Mark Davis',
      feedback:
        'The best developer we’ve worked with. Extremely professional, creative, and reliable.',
      image: 'https://i.postimg.cc/FF2XNtDt/DALL-E-2025-01-15-23-49-05-A-single-male-person-smiling-confidently-ideal-for-a-testimonial-page.webp',
    },
  ];

  return (
    <div className="bg-dark text-white py-4">
      <Container>
        {/* HERO SECTION */}
        <section id="hero" className="mb-5">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">{userName}</h1>
              <h2 className="fs-4 text-secondary">{userProfession}</h2>
              <div className="d-flex gap-3 mt-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={`bi ${link.iconClass} fs-3 hover-icon`}></i>
                  </a>
                ))}
              </div>
            </Col>
            <Col md={6} className="text-md-end">
              <img
                src={userImage}
                alt="User Profile"
                className="img-fluid rounded-circle hero-image"
              />
            </Col>
          </Row>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">Projects</h3>
          <Row>
            {projects.map((project, idx) => (
              <Col md={4} className="mb-4" key={idx}>
                <Card className="h-100 project-card border-0 bg-transparent text-white">
                  <div className="project-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={project.image}
                      className="project-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">Skills</h3>
          {/* Group skills by category if desired */}
          {/* For example, filter or group them in your actual data/logic */}
          <Row>
            {skills.map((skill, idx) => (
              <Col md={6} className="mb-3" key={idx}>
                <div className="mb-1">
                  <strong>{skill.name}</strong> 
                  <span className="text-secondary ms-2">
                    ({skill.category})
                  </span>
                </div>
                <ProgressBar
                  now={skill.level}
                  label={`${skill.level}%`}
                  className="bg-secondary progress-skill"
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">Testimonials</h3>
          <Row>
            {testimonials.map((testi, idx) => (
              <Col md={6} className="mb-4" key={idx}>
                <Card className="bg-transparent border-secondary h-100 text-white testimonial-card">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={testi.image}
                        alt={testi.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <h5 className="mb-0">{testi.name}</h5>
                    </div>
                    <Card.Text>"{testi.feedback}"</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-5">
          <h3 className="mb-4 border-bottom pb-2">Contact</h3>
          <Row>
            <Col md={6}>
              {/* Contact Form */}
              <Form>
                <Form.Group className="mb-3" controlId="contactName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="bg-dark text-white border-secondary"
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="bg-dark text-white border-secondary"
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="bg-dark text-white border-secondary"
                    placeholder="Your message..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </Form>
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h5>Find me on social media:</h5>
              <div className="d-flex gap-3 mt-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white fs-5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={`bi ${link.iconClass} hover-icon`}></i>
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default LivePreview;
