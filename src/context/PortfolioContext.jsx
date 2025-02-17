// context/PortfolioContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// 1. Create Context
const PortfolioContext = createContext(null);

// 2. Initial State (add a template property)
const initialState = {
  user: {
    name: 'John Doe',
    plan: 'Pro Plan',
    avatarUrl:
      'https://i.postimg.cc/JhmWc727/DALL-E-2025-01-15-23-43-34-A-single-person-smiling-confidently-ideal-for-a-testimonial-page-The.webp',
  },
  sections: {
    hero: {
      title: 'Welcome to My Portfolio!',
      subtitle: 'I build amazing things with React.',
      image:
        'https://i.postimg.cc/7P2Jx2SK/DALL-E-2025-01-15-23-49-05-A-single-male-person-smiling-confidently-ideal-for-a-testimonial-page.webp',
    },
    projects: {
      title: 'My Projects',
      items: [
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
      ],
    },
    skills: {
      title: 'My Skills',
      items: [
        { category: 'Front-End', name: 'React', level: 80, icon: 'SiJavascript' },
        { category: 'Front-End', name: 'Bootstrap', level: 90, icon: 'SiJavascript' },
        { category: 'Back-End', name: 'Node.js', level: 70, icon: 'SiPython' },
        { category: 'Back-End', name: 'Express', level: 65, icon: 'SiCplusplus' },
      ],
    },
    testimonials: {
      title: 'What Others Say',
      items: [
        {
          name: 'Jane Smith',
          feedback:
            'John delivered the project on time and exceeded our expectations. Highly recommend!',
          image:
            'https://i.postimg.cc/Qtt0WtN6/DALL-E-2025-01-15-23-49-55-A-single-female-person-smiling-confidently-ideal-for-a-testimonial-pag.webp',
        },
        {
          name: 'Mark Davis',
          feedback:
            'The best developer we’ve worked with. Extremely professional, creative, and reliable.',
          image:
            'https://i.postimg.cc/FF2XNtDt/DALL-E-2025-01-15-23-49-05-A-single-male-person-smiling-confidently-ideal-for-a-testimonial-page.webp',
        },
      ],
    },
    contact: {
      title: 'Get in Touch',
      details: '',
    },
  },
  colors: {
    primary: '#0d6efd',
    accent: '#6610f2',
  },
  fontFamily: 'Roboto',
  activeSection: 'hero',
  template: 'Modern', // New property for the selected template
};

// 3. Reducer Function (add a case for updating the template)
function portfolioReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'UPDATE_SECTION_CONTENT':
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.payload.section]: {
            ...state.sections[action.payload.section],
            ...action.payload.data,
          },
        },
      };
    case 'UPDATE_COLOR':
      return {
        ...state,
        colors: { ...state.colors, [action.payload.key]: action.payload.value },
      };
    case 'UPDATE_FONT_FAMILY':
      return {
        ...state,
        fontFamily: action.payload,
      };
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        template: action.payload,
      };
    default:
      return state;
  }
}

// 4. Context Provider Component with Persistence
export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(
    portfolioReducer,
    initialState,
    (initial) => {
      const persisted = localStorage.getItem('portfolioState');
      return persisted ? JSON.parse(persisted) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem('portfolioState', JSON.stringify(state));
  }, [state]);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function usePortfolio() {
  return useContext(PortfolioContext);
}
