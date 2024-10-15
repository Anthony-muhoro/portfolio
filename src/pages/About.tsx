import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
            alt="Profile picture"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
        <div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-800 mb-4"
          >
            Hi, I'm [Your Name]
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            I'm a passionate software developer with a keen interest in creating innovative solutions
            that make a difference. With [X] years of experience in the tech industry, I've had the
            opportunity to work on a wide range of projects, from web applications to mobile apps and
            everything in between.
          </motion.p>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-6"
          >
            My journey in tech started [brief background]. Since then, I've been constantly learning
            and adapting to new technologies, always striving to improve my skills and stay ahead of
            the curve.
          </motion.p>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600"
          >
            When I'm not coding, you can find me [hobbies/interests]. I believe in the power of
            technology to transform lives and am always excited to take on new challenges and
            collaborate on interesting projects.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;