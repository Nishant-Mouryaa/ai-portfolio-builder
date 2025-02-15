// src/components/PortfolioPreview.jsx
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const PortfolioPreview = () => {
  const { userData, settings } = usePortfolio();

  if (!userData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-300">
        Loading portfolio...
      </div>
    );
  }

  // Destructure some data
  const { projects, skills, testimonials, bio, selectedTemplate } = userData;

  // Animation variants for fading in content
  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-6"
        >
          About Me
        </motion.h2>
        <motion.p
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          className="text-lg mb-12"
        >
          {bio || "This is your bio. Tell your story, highlight your skills and achievements."}
        </motion.p>

        {/* Projects Section */}
        <motion.h2
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-6"
        >
          Projects
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projects && projects.length > 0 ? (
            projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeVariant}
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No projects to display.</p>
          )}
        </div>

        {/* Skills Section */}
        <motion.h2
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mt-12 mb-6"
        >
          Skills & Technologies
        </motion.h2>
        <div className="space-y-4">
          {skills && skills.length > 0 ? (
            skills.map((skill, idx) => (
              <motion.div key={idx} variants={fadeVariant} className="flex flex-col">
                <span className="font-semibold">{skill.name}</span>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>

        {/* Testimonials Section */}
        <motion.h2
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mt-12 mb-6"
        >
          Testimonials
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={fadeVariant}
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow"
              >
                {t.image && (
                  <img
                    src={t.image}
                    alt={`Testimonial ${idx}`}
                    className="w-16 h-16 rounded-full mb-4 object-cover mx-auto"
                  />
                )}
                <p className="text-gray-300 italic mb-2">"{t.message}"</p>
                <p className="text-blue-400 font-semibold text-center">- {t.author}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No testimonials available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
