import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// 1. Create Context
const PortfolioContext = createContext(null);

// 2. Initial State
const initialState = {
  user: {
    name: 'John Doe',
    plan: 'Pro Plan',
    avatarUrl: '', // if you want to store an avatar image
  },
  sections: {
    hero: {
      title: 'Welcome to My Portfolio!',
      subtitle: 'I build amazing things with React.',
    },
    projects: {
      title: 'My Projects',
      items: [],
    },
    skills: {
      title: 'My Skills',
      items: [],
    },
    testimonials: {
      title: 'What Others Say',
      items: [],
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
};

// 3. Reducer Function
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
    default:
      return state;
  }
}

// 4. Context Provider Component
export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 5. Custom Hook to Access Context
export function usePortfolio() {
  return useContext(PortfolioContext);
}
