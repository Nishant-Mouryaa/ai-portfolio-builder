// src/components/HeroSection.jsx
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const HeroSection = () => {
  // You can get these values from context (userData) in your actual implementation.
  const name = "Your Name";
  const profession = "Your Profession";
  const socialLinks = { linkedin: "#", github: "#", twitter: "#" };
  const profilePhoto = "/path/to/profile.jpg";

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const renderSocialIcons = () => (
    <div className="flex space-x-4">
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
        <FaLinkedin size={28} />
      </a>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
        <FaGithub size={28} />
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
        <FaTwitter size={28} />
      </a>
    </div>
  );

  return (
    <section className="mb-12">
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-600 to-purple-700 p-12 rounded-lg shadow-2xl">
        <div className="md:w-2/3">
          <h1 className="text-5xl font-bold mb-4"> {name} </h1>
          <p className="text-xl mb-6"> {profession} </p>
          <div className="mb-6">
            {renderSocialIcons()}
          </div>
          <div className="flex space-x-4">
            <Button variant="light" size="lg" className="px-6 py-3">Hire Me</Button>
            <Button variant="outline-light" size="lg" className="px-6 py-3 border border-white">Download CV</Button>
          </div>
        </div>
        <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
          <Image src={profilePhoto} alt="Profile" roundedCircle className="w-40 h-40 object-cover shadow-lg" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
 
