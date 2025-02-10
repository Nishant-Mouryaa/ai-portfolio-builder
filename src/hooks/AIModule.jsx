// AIModule.jsx
import { useState } from 'react';

/* 
  Debounce helper: delays invoking `func` until after `delay` ms have elapsed
  since the last time it was invoked.
*/
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * useAIModule hook
 *
 * Provides functions for:
 *  - Generating context-aware AI bios
 *  - Generating context-aware project descriptions
 *  - Generating portfolio structure suggestions based on profession
 *  - Recording user feedback on AI-generated suggestions
 */
export const useAIModule = () => {
  const [feedback, setFeedback] = useState({}); // { suggestionId: rating }
  
  // Retrieve the API key using Vite's env variable syntax.
  const apiKey = import.meta.env.VITE_REACT_APP_HF_API_KEY;
  if (!apiKey) {
    console.error('Missing VITE_REACT_APP_HF_API_KEY in environment variables');
  }

  // --- AI Generation Functions ---

  const generateAIBio = async ({ profession, currentBio = '' }) => {
    const prompt = `
    You are an AI expert in writing professional bios. Your job is to write a high-quality, engaging, and professional bio.
    - **Profession**: ${profession}
    - **Current Bio**: ${currentBio || "No bio provided"}
    - **Tone**: Professional, engaging, concise
    - **Word Limit**: 40-60 words
    - **Example Output**: "John is a full-stack developer with 5+ years of experience in JavaScript, React, and Node.js. Passionate about building scalable web applications and improving user experience."
    Generate **3 variations** of the professional bio.
    `;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/bigscience/bloomz-7b1", // Switch to a better model
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: { num_return_sequences: 3 },
                }),
            }
        );
        const data = await response.json();
        const suggestions = Array.isArray(data) ? data.map(item => item.generated_text) : [];
        return suggestions;
    } catch (error) {
        console.error('Error generating AI bio:', error);
        return [];
    }
};


const generateAIProjectDescription = async ({ title, currentDescription = '' }) => {
    const prompt = `
    You are an AI specialized in writing compelling project descriptions. 
    - **Project Title**: ${title}
    - **Current Description**: ${currentDescription || "No description provided"}
    - **Goal**: Write a clear, professional, and engaging project description.
    - **Word Limit**: 40-80 words
    - **Example Output**: "Developed a modern e-commerce website using React and Node.js, implementing a fast and secure payment gateway with Stripe. Enhanced user experience through an optimized UI, leading to a 20% increase in conversions."
    Generate **3 variations** of the project description.
    `;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/opt-1.3b", // Better model for text generation
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: { num_return_sequences: 3 },
                }),
            }
        );
        const data = await response.json();
        const suggestions = Array.isArray(data) ? data.map(item => item.generated_text) : [];
        return suggestions;
    } catch (error) {
        console.error('Error generating AI project description:', error);
        return [];
    }
};


  /**
   * Generate AI suggestions for portfolio structure based on the user's profession.
   * Returns a promise that resolves to an array of suggested sections.
   */
  const generateAIStructure = async (profession) => {
    const prompt = `Based on the profession "${profession}", suggest an optimal portfolio structure. 
    Provide a comma-separated list of sections such as "About, Projects, Skills, Experience, Education".`;
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/distilgpt2", // Replace with your model endpoint for portfolio structure.
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: { num_return_sequences: 1 },
          }),
        }
      );
      const data = await response.json();
      const structureText = Array.isArray(data) && data[0] ? data[0].generated_text : '';
      const sections = structureText.split(',').map(section => section.trim()).filter(Boolean);
      return sections;
    } catch (error) {
      console.error('Error generating AI portfolio structure:', error);
      return [];
    }
  };

  // --- Debounced Versions ---
  const debouncedGenerateAIBio = debounce(generateAIBio, 300);
  const debouncedGenerateAIProjectDescription = debounce(generateAIProjectDescription, 300);
  const debouncedGenerateAIStructure = debounce(generateAIStructure, 300);

  // --- User Feedback Mechanism ---
  /**
   * Record user feedback for a given suggestion.
   * suggestionId: a unique identifier for the suggestion (could be a combination of type and index)
   * rating: numeric rating or feedback (e.g., 1-5 or +1 / -1)
   */
  const submitFeedback = (suggestionId, rating) => {
    setFeedback((prev) => ({ ...prev, [suggestionId]: rating }));
    // In a production system, you might also send this feedback to a backend.
    console.log(`Feedback for ${suggestionId}: ${rating}`);
  };

  // --- Return API ---
  return {
    generateAIBio: debouncedGenerateAIBio,
    generateAIProjectDescription: debouncedGenerateAIProjectDescription,
    generateAIStructure: debouncedGenerateAIStructure,
    submitFeedback,
    feedback,
  };
};
 
