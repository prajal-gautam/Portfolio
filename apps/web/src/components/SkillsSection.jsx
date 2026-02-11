import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SkillsSection = () => {
  const coreSkills = [
    { name: 'HTML', proficiency: 95 },
    { name: 'CSS', proficiency: 90 },
    { name: 'JavaScript', proficiency: 85 },
    { name: 'React', proficiency: 85 },
    { name: 'Responsive Design', proficiency: 90 },
    { name: 'UI/UX', proficiency: 80 },
    { name: 'Git', proficiency: 85 },
    { name: 'Problem Solving', proficiency: 90 },
  ];

  const learningSkills = [
    'Next.js',
    'TypeScript',
    'Advanced CSS',
    'Web Performance',
    'UI/UX Design',
    'State Management'
  ];

  return (
    <section id="skills" className="py-16 md:py-24 px-4 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <motion.div 
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/30 group">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-100 group-hover:text-blue-400 transition-colors">Core Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {coreSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-200 font-medium text-sm md:text-base">{skill.name}</span>
                      <span className="text-blue-400 font-semibold text-sm md:text-base">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] relative"
                      >
                        <motion.div 
                          className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-purple-500/30 group">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-purple-100 group-hover:text-purple-400 transition-colors">Currently Learning</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(51, 65, 85, 0.5)" }}
                    className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-purple-500/50 transition-all cursor-default"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                    <span className="text-slate-200 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;