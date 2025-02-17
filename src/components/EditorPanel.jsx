// components/EditorPanel.js
import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './EditorPanel.css';
import { usePortfolio } from '../context/PortfolioContext';

function EditorPanel() {
  const { state, dispatch } = usePortfolio();
  const { sections, activeSection, template } = state;
  const sectionData = sections[activeSection] || {};

  // Generic handler for updating section fields
  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { [field]: value } },
    });
  };

  // Template selection handler
  const handleTemplateChange = (value) => {
    dispatch({ type: 'UPDATE_TEMPLATE', payload: value });
  };

  // ---------- Projects Section Functions ----------
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...(sectionData.items || [])];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedProjects } },
    });
  };

  const addProject = () => {
    const newProject = { title: '', description: '', image: '' };
    const updatedProjects = sectionData.items
      ? [...sectionData.items, newProject]
      : [newProject];
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedProjects } },
    });
  };

  const removeProject = (index) => {
    const updatedProjects = [...(sectionData.items || [])];
    updatedProjects.splice(index, 1);
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedProjects } },
    });
  };

  // ---------- Skills Section Functions ----------
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...(sectionData.items || [])];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedSkills } },
    });
  };

  const addSkill = () => {
    const newSkill = { icon: '', name: '', category: '', level: 0 };
    const updatedSkills = sectionData.items
      ? [...sectionData.items, newSkill]
      : [newSkill];
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedSkills } },
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...(sectionData.items || [])];
    updatedSkills.splice(index, 1);
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedSkills } },
    });
  };

  // ---------- Testimonials Section Functions ----------
  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...(sectionData.items || [])];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedTestimonials } },
    });
  };

  const addTestimonial = () => {
    const newTestimonial = { name: '', feedback: '', image: '' };
    const updatedTestimonials = sectionData.items
      ? [...sectionData.items, newTestimonial]
      : [newTestimonial];
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedTestimonials } },
    });
  };

  const removeTestimonial = (index) => {
    const updatedTestimonials = [...(sectionData.items || [])];
    updatedTestimonials.splice(index, 1);
    dispatch({
      type: 'UPDATE_SECTION_CONTENT',
      payload: { section: activeSection, data: { items: updatedTestimonials } },
    });
  };

  return (
    <Card className="editor-panel-card bg-dark text-white">
      <Card.Header className="editor-panel-header">
        <h5>
          Editor Panel -{' '}
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h5>
      </Card.Header>
      <Card.Body>
        {/* Template Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Choose Template</Form.Label>
          <Form.Select
            value={template}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="bg-dark text-white border-secondary"
          >
            <option value="Modern">Modern</option>
            <option value="Creative">Creative</option>
            <option value="Classic">Classic</option>
          </Form.Select>
        </Form.Group>

        {activeSection === 'hero' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Hero Title</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hero Image URL</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.image || ''}
                onChange={(e) => handleChange('image', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
          </>
        )}

        {activeSection === 'projects' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Projects Title</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <div className="mb-3">
              <h6>Project Items</h6>
              {(sectionData.items || []).map((project, index) => (
                <div key={index} className="project-item mb-3 p-2 border rounded">
                  <Form.Group className="mb-2">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.title || ''}
                      onChange={(e) =>
                        handleProjectChange(index, 'title', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.description || ''}
                      onChange={(e) =>
                        handleProjectChange(index, 'description', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Project Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.image || ''}
                      onChange={(e) =>
                        handleProjectChange(index, 'image', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Button variant="danger" size="sm" onClick={() => removeProject(index)}>
                    Remove Project
                  </Button>
                </div>
              ))}
              <Button variant="primary" size="sm" onClick={addProject}>
                Add Project
              </Button>
            </div>
          </>
        )}

        {activeSection === 'skills' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Skills Title</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <div className="mb-3">
              <h6>Skill Items</h6>
              {(sectionData.items || []).map((skill, index) => (
                <div key={index} className="skill-item mb-3 p-2 border rounded">
                  <Form.Group className="mb-2">
                    <Form.Label>Skill Icon</Form.Label>
                    <Form.Select
                      value={skill.icon || ''}
                      onChange={(e) =>
                        handleSkillChange(index, 'icon', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    >
                      <option value="">None</option>
                      <option value="SiJavascript">JavaScript</option>
                      <option value="SiPython">Python</option>
                      <option value="SiCplusplus">C++</option>
                      <option value="SiRuby">Ruby</option>
                      <option value="SiPhp">PHP</option>
                      <option value="SiGo">Go</option>
                      <option value="SiTypescript">TypeScript</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Skill Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={skill.name || ''}
                      onChange={(e) =>
                        handleSkillChange(index, 'name', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={skill.category || ''}
                      onChange={(e) =>
                        handleSkillChange(index, 'category', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Proficiency Level ({skill.level}%)</Form.Label>
                    <Form.Range
                      min="0"
                      max="100"
                      value={skill.level || 0}
                      onChange={(e) =>
                        handleSkillChange(index, 'level', parseInt(e.target.value))
                      }
                    />
                  </Form.Group>
                  <Button variant="danger" size="sm" onClick={() => removeSkill(index)}>
                    Remove Skill
                  </Button>
                </div>
              ))}
              <Button variant="primary" size="sm" onClick={addSkill}>
                Add Skill
              </Button>
            </div>
          </>
        )}

        {activeSection === 'testimonials' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Testimonials Title</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <div className="mb-3">
              <h6>Testimonial Items</h6>
              {(sectionData.items || []).map((testi, index) => (
                <div key={index} className="testimonial-item mb-3 p-2 border rounded">
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={testi.name || ''}
                      onChange={(e) =>
                        handleTestimonialChange(index, 'name', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="2"
                      value={testi.feedback || ''}
                      onChange={(e) =>
                        handleTestimonialChange(index, 'feedback', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={testi.image || ''}
                      onChange={(e) =>
                        handleTestimonialChange(index, 'image', e.target.value)
                      }
                      className="bg-dark text-white border-secondary"
                    />
                  </Form.Group>
                  <Button variant="danger" size="sm" onClick={() => removeTestimonial(index)}>
                    Remove Testimonial
                  </Button>
                </div>
              ))}
              <Button variant="primary" size="sm" onClick={addTestimonial}>
                Add Testimonial
              </Button>
            </div>
          </>
        )}

        {activeSection === 'contact' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Contact Title</Form.Label>
              <Form.Control
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={sectionData.details || ''}
                onChange={(e) => handleChange('details', e.target.value)}
                className="bg-dark text-white border-secondary"
                placeholder="Enter address, phone number, or other details..."
              />
            </Form.Group>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default EditorPanel;
