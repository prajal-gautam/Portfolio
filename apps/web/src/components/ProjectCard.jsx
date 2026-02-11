import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const ProjectCard = ({ title, description, techStack, liveDemo, github, index, status, isFeatured, tooltip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card 
        className={`h-full flex flex-col rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 group relative
          ${isFeatured 
            ? 'border-blue-500/60 bg-slate-800/60 shadow-xl shadow-blue-500/10' 
            : 'border-slate-700/50 bg-slate-800/40 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50'
          }
        `}
      >
        {/* Featured Glow Effect */}
        {isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        )}
        
        {/* Hover Glow Effect for all cards */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="space-y-1">
              <CardTitle className={`text-xl font-bold transition-colors duration-300 ${isFeatured ? 'text-blue-100' : 'group-hover:text-blue-400'}`}>
                {title}
              </CardTitle>
              {tooltip && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-blue-400 font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  {tooltip}
                </motion.p>
              )}
            </div>
            
            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="shrink-0"
              >
                <motion.span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"],
                    borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.6)", "rgba(59, 130, 246, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {status}
                </motion.span>
              </motion.div>
            )}
          </div>
          
          <CardDescription className="text-slate-300 mt-2 leading-relaxed">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow pb-4 relative z-10">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300
                  ${isFeatured 
                    ? 'bg-blue-500/20 text-blue-200 border-blue-500/30' 
                    : 'bg-blue-500/10 text-blue-300 border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-500/20'
                  }
                `}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="gap-3 pt-2 relative z-10">
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              size="sm"
              className={`w-full text-white shadow-lg transition-all
                ${isFeatured 
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                }
              `}
              onClick={() => window.open(liveDemo, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-slate-600 hover:bg-slate-700 hover:text-white"
              onClick={() => window.open(github, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;