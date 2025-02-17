// components/Features.jsx
import React from 'react';
import { Container, Row, Col, Card, Carousel, Accordion } from 'react-bootstrap';
// Import icons from react-icons (FontAwesome, Material, etc.)
import { FaRegEye, FaPalette, FaRegEdit } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdOutlineSocialDistance } from 'react-icons/md';
import { IoSpeedometerOutline } from 'react-icons/io5';
import './Features.css';

function Features() {
  return (
    <Container fluid className="features-page p-4">
      <h2 className="text-center mb-4">Features</h2>
      <p className="text-center mb-5">
        Discover the cutting-edge features of our AI Portfolio Builder – a tool that lets you create a dynamic, professional online portfolio with live previews, customizable templates, and AI-powered suggestions.
      </p>

      {/* Key Features Section */}
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <FaRegEye size={48} className="mb-3 text-primary" />
              <Card.Title>Live Portfolio Preview</Card.Title>
              <Card.Text>
                Instantly see your edits in real-time.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <FaPalette size={48} className="mb-3 text-success" />
              <Card.Title>Dynamic Templates</Card.Title>
              <Card.Text>
                Choose from various professional designs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <GiArtificialIntelligence size={48} className="mb-3 text-warning" />
              <Card.Title>AI-Powered Suggestions</Card.Title>
              <Card.Text>
                Generate bios, project descriptions, and layouts with AI.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <FaRegEdit size={48} className="mb-3 text-danger" />
              <Card.Title>Interactive Editor</Card.Title>
              <Card.Text>
                Edit portfolio sections like Hero, Projects, Testimonials, and Contact.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <MdOutlineSocialDistance size={48} className="mb-3 text-info" />
              <Card.Title>Social & Contact Integration</Card.Title>
              <Card.Text>
                Easily integrate GitHub, LinkedIn, and more.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center feature-card">
            <Card.Body>
              <IoSpeedometerOutline size={48} className="mb-3 text-secondary" />
              <Card.Title>Smooth UI & Performance</Card.Title>
              <Card.Text>
                Enjoy a modern, responsive, and fast experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* How It Works Section */}
      <section className="mb-5">
        <h3 className="mb-3 text-center">How It Works</h3>
        <p>
          Our AI Portfolio Builder makes creating your portfolio as simple as:
        </p>
        <ol>
          <li>
            <strong>Design:</strong> Choose a dynamic template and customize fonts, colors, and layouts.
          </li>
          <li>
            <strong>Edit:</strong> Use our interactive editor to update sections in real-time.
          </li>
          <li>
            <strong>Deploy:</strong> Publish your portfolio and share it with the world.
          </li>
        </ol>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-5">
        <h3 className="mb-3 text-center">Why Choose Us?</h3>
        <p>
          Our platform harnesses AI to create a unique, engaging online presence. We simplify the process so you can focus on what you do best.
        </p>
      </section>

      {/* User Testimonials Section */}
      <section className="mb-5">
        <h3 className="mb-3 text-center">User Testimonials</h3>
        <Carousel variant="dark">
          <Carousel.Item>
            <blockquote className="blockquote text-center">
              <p className="mb-0">"This builder transformed my online presence. The AI suggestions were a game-changer!"</p>
              <footer className="blockquote-footer text-white">
                Jane Doe, <cite title="Source Title">Web Developer</cite>
              </footer>
            </blockquote>
          </Carousel.Item>
          <Carousel.Item>
            <blockquote className="blockquote text-center">
              <p className="mb-0">"A seamless and intuitive experience that let me build a professional portfolio in minutes."</p>
              <footer className="blockquote-footer text-white">
                John Smith, <cite title="Source Title">Designer</cite>
              </footer>
            </blockquote>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* FAQs Section */}
      <section className="mb-5">
        <h3 className="mb-3 text-center">FAQs</h3>
        <Accordion defaultActiveKey="0" flush variant="dark">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is the AI Portfolio Builder?</Accordion.Header>
            <Accordion.Body>
              It’s an AI-powered tool that helps you build, customize, and manage your portfolio effortlessly.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Do I need coding skills?</Accordion.Header>
            <Accordion.Body>
              Not at all—our platform is designed for users of all skill levels.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do AI suggestions work?</Accordion.Header>
            <Accordion.Body>
              The AI analyzes your input and generates content suggestions to enhance your portfolio.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </Container>
  );
}

export default Features;
