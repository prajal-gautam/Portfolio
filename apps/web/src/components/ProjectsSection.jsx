import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Sublytics - Subscription Manager',
      description: 'A powerful subscription management app that helps users track, organize, and control all their recurring payments in one place. Never miss a renewal date or get charged for forgotten subscriptions again. Built with modern frontend technologies for a seamless user experience.',
      techStack: ['React', 'JavaScript', 'TailwindCSS', 'Chart.js'],
      liveDemo: 'https://sublytic-delta.vercel.app/',
      github: 'https://github.com/prajal-gautam',
      status: '🚀 Currently Working On',
      isFeatured: true,
      tooltip: 'Latest project - actively being developed'
    },
    {
      title: 'High-Converting Landing Page',
      description: 'A pixel-perfect landing page designed for maximum conversion. Implements smooth scroll animations, responsive layouts, and optimized performance metrics.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      liveDemo: '#',
      github: 'https://github.com/prajal-gautam',
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A premium portfolio showcasing frontend skills. Built with React and TailwindCSS, featuring glassmorphism design, dark mode, and framer-motion animations.',
      techStack: ['React', 'TailwindCSS', 'Framer Motion'],
      liveDemo: '#',
      github: 'https://github.com/prajal-gautam',
    },
    {
      title: 'Interactive To-Do App',
      description: 'A feature-rich task manager with drag-and-drop functionality, local storage persistence, and a highly interactive user interface.',
      techStack: ['JavaScript', 'CSS Grid', 'DOM API'],
      liveDemo: '#',
      github: 'https://github.com/prajal-gautam',
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <motion.div 
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;