// src/data/templates.js
export const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    font: 'Arial, sans-serif',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    layout: 'single-column', // layout style (e.g., single-column, grid, split)
    typography: {
      headerSize: '3rem',
      bodySize: '1rem',
      headerWeight: '700',
      bodyWeight: '400',
    },
    // Section order that includes hero and skills.
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {
      hero: { backgroundColor: '#007bff', color: '#ffffff', padding: '5rem 0' },
      about: { backgroundColor: '#ffffff', padding: '3rem 0' },
      projects: { backgroundColor: '#f8f9fa', padding: '3rem 0' },
      skills: { backgroundColor: '#ffffff', padding: '3rem 0' },
      testimonials: { backgroundColor: '#ffffff', padding: '3rem 0' },
      contact: { backgroundColor: '#ffffff', padding: '3rem 0' },
    },
    image: '/templates/minimal.png', // Thumbnail for selection
  },
  {
    id: 'creative',
    name: 'Creative',
    font: 'Poppins, sans-serif',
    primaryColor: '#ff5722',
    backgroundColor: '#fdfdfd',
    layout: 'grid', // Uses a grid layout for projects or portfolio items
    typography: {
      headerSize: '2.8rem',
      bodySize: '1rem',
      headerWeight: '600',
      bodyWeight: '400',
    },
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'],
    styles: {
      hero: { backgroundColor: '#ff5722', color: '#ffffff', padding: '5rem 0' },
      about: { backgroundColor: '#fff5e6', padding: '3rem 0' },
      projects: { backgroundColor: '#ffe6e6', padding: '3rem 0' },
      skills: { backgroundColor: '#fff5e6', padding: '3rem 0' },
      testimonials: { backgroundColor: '#e6f7ff', padding: '3rem 0' },
      contact: { backgroundColor: '#ffffff', padding: '3rem 0' },
    },
    image: '/templates/creative.png',
  },
  {
    id: 'professional',
    name: 'Professional',
    font: 'Roboto, sans-serif',
    primaryColor: '#333333',
    backgroundColor: '#ffffff',
    layout: 'split-column', // Use a split layout for contact/testimonials, etc.
    typography: {
      headerSize: '3rem',
      bodySize: '1rem',
      headerWeight: '700',
      bodyWeight: '400',
    },
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'contact', 'testimonials'],
    styles: {
      hero: { backgroundColor: '#333333', color: '#ffffff', padding: '5rem 0' },
      about: { backgroundColor: '#ffffff', padding: '3rem 0' },
      projects: { backgroundColor: '#f8f9fa', padding: '3rem 0' },
      skills: { backgroundColor: '#ffffff', padding: '3rem 0' },
      contact: { backgroundColor: '#ffffff', padding: '3rem 0' },
      testimonials: { backgroundColor: '#ffffff', padding: '3rem 0' },
    },
    image: '/templates/professional.png',
  }
];
