import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, BookOpen, Code } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-4 bg-slate-900/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">My Journey</h3>
                </div>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                  I'm a Frontend Developer with a deep passion for crafting intuitive and visually stunning user interfaces. My journey began with a curiosity for design and code, which evolved into a dedicated pursuit of mastering modern frontend technologies.
                </p>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  I focus on writing clean, maintainable code and building responsive applications that provide exceptional user experiences across all devices.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <Card className="rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
                    <div className="space-y-1">
                      <p className="text-slate-300 font-medium">BE.IT – NCIT, Pokhara University</p>
                      <p className="text-slate-400 text-sm">Currently: 5th Semester</p>
                      <p className="text-slate-400 text-sm">Expected Graduation: 2026</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow flex-1">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg shrink-0">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Learning Focus</h3>
                    <p className="text-slate-300 text-sm md:text-base">
                      Currently diving deep into advanced React patterns, Next.js for server-side rendering, and mastering TypeScript for robust application development. I'm also exploring UI/UX principles to better bridge the gap between design and code.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;