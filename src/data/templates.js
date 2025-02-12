// src/data/templates.js
export const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    font: 'Arial, sans-serif',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    // Updated section order to include hero and skills
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {
      hero: { backgroundColor: '#007bff', color: '#ffffff' },
      about: { backgroundColor: '#ffffff' },
      projects: { backgroundColor: '#f8f9fa' },
      skills: { backgroundColor: '#ffffff' },
      testimonials: { backgroundColor: '#ffffff' },
      contact: { backgroundColor: '#ffffff' },
    },
    image: '/templates/minimal.png' // thumbnail for selection
  },
  {
    id: 'creative',
    name: 'Creative',
    font: 'Poppins, sans-serif',
    primaryColor: '#ff5722',
    backgroundColor: '#fdfdfd',
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {
      hero: { backgroundColor: '#ff5722', color: '#ffffff' },
      about: { backgroundColor: '#fff5e6' },
      projects: { backgroundColor: '#ffe6e6' },
      skills: { backgroundColor: '#fff5e6' },
      testimonials: { backgroundColor: '#e6f7ff' },
      contact: { backgroundColor: '#ffffff' },
    },
    image: '/templates/creative.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    font: 'Roboto, sans-serif',
    primaryColor: '#333333',
    backgroundColor: '#ffffff',
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'contact', 'testimonials'],
    styles: {
      hero: { backgroundColor: '#333333', color: '#ffffff' },
      about: { backgroundColor: '#ffffff' },
      projects: { backgroundColor: '#f8f9fa' },
      skills: { backgroundColor: '#ffffff' },
      contact: { backgroundColor: '#ffffff' },
      testimonials: { backgroundColor: '#ffffff' },
    },
    image: '/templates/professional.png'
  }
];
