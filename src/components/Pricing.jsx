// components/Pricing.jsx
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Accordion,
  Carousel,
} from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import './Pricing.css';

function Pricing() {
  return (
    <Container fluid className="pricing-page p-4">
      <h2 className="text-center mb-4">Pricing Plans</h2>
      <p className="text-center mb-5">
        Choose the plan that best suits your needs. We offer a range of affordable pricing plans to help you build and maintain your portfolio.
      </p>

      {/* Pricing Cards */}
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center pricing-card dark-card">
            <Card.Header className="card-header-dark">Free Plan</Card.Header>
            <Card.Body>
              <h3>$0/month</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <FaCheck className="me-2 text-success" />
                  Basic Features
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  Limited Templates
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  Community Support
                </li>
              </ul>
              <Button variant="primary" className="w-100">
                Get Started
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center pricing-card dark-card">
            <Card.Header className="card-header-primary">Pro Plan</Card.Header>
            <Card.Body>
              <h3>$19/month</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <FaCheck className="me-2 text-success" />
                  Advanced Templates
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  AI-Powered Features
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  Email Support
                </li>
              </ul>
              <Button variant="primary" className="w-100">
                Upgrade Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center pricing-card dark-card">
            <Card.Header className="card-header-warning">Business Plan</Card.Header>
            <Card.Body>
              <h3>$49/month</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <FaCheck className="me-2 text-success" />
                  Custom Templates
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  Premium AI Tools
                </li>
                <li>
                  <FaCheck className="me-2 text-success" />
                  Priority Support
                </li>
              </ul>
              <Button variant="primary" className="w-100">
                Upgrade Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feature Comparison Table */}
      <h3 className="text-center mb-4">Feature Comparison</h3>
      <Table responsive bordered hover variant="dark" className="mb-5">
        <thead>
          <tr>
            <th>Features</th>
            <th>Free</th>
            <th>Pro</th>
            <th>Business</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Live Portfolio Preview</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Dynamic Templates</td>
            <td>Limited</td>
            <td>Advanced</td>
            <td>Custom</td>
          </tr>
          <tr>
            <td>AI-Powered Suggestions</td>
            <td>—</td>
            <td>Included</td>
            <td>Premium</td>
          </tr>
          <tr>
            <td>Interactive Editor</td>
            <td>Basic</td>
            <td>Advanced</td>
            <td>Advanced</td>
          </tr>
          <tr>
            <td>Social Integration</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Support</td>
            <td>Community</td>
            <td>Email</td>
            <td>Priority</td>
          </tr>
        </tbody>
      </Table>

      {/* FAQs Section */}
      <h3 className="text-center mb-4">Frequently Asked Questions</h3>
      <Accordion defaultActiveKey="0" className="mb-5" variant="dark">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What features are included in the Free Plan?</Accordion.Header>
          <Accordion.Body>
            The Free Plan includes basic portfolio features, limited templates, and community support.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How does the AI-powered content suggestion work?</Accordion.Header>
          <Accordion.Body>
            Our AI analyzes your portfolio content and offers smart suggestions for bios, project descriptions, and layout improvements.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Can I upgrade my plan later?</Accordion.Header>
          <Accordion.Body>
            Yes, you can upgrade from the Free Plan to Pro or Business at any time with immediate access to premium features.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* User Testimonials & Trust Signals */}
      <h3 className="text-center mb-4">What Our Users Say</h3>
      <Carousel variant="dark" className="mb-5">
        <Carousel.Item>
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              "The AI Portfolio Builder has completely transformed my online presence. The dynamic templates and AI features are a game-changer!"
            </p>
            <footer className="blockquote-footer text-white">
              Alex Johnson, <cite title="Source Title">Freelancer</cite>
            </footer>
          </blockquote>
        </Carousel.Item>
        <Carousel.Item>
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              "I upgraded to the Pro Plan and couldn’t be happier. The advanced templates and personalized AI suggestions boosted my credibility instantly."
            </p>
            <footer className="blockquote-footer text-white">
              Maria Rodriguez, <cite title="Source Title">Developer</cite>
            </footer>
          </blockquote>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Pricing;
