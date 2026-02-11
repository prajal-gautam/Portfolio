import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUp, Github, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-8">
            {[
              { Icon: Github, href: "https://github.com/prajal-gautam", color: "hover:text-blue-400" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/prajal-gautam-272a603a8/", color: "hover:text-blue-400" },
              { Icon: Instagram, href: "https://www.instagram.com/prajal.xiv/", color: "hover:text-pink-500" },
              { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=prajal.gautam.co@gmail.com", color: "hover:text-green-400" }
            ].map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-400 hover:text-white transition-all ${color}`}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-slate-300 font-medium">
              Designed & Built by Prajal Gautam
            </p>
            <p className="text-slate-500 text-sm">
              © 2026 All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 rounded-full w-12 h-12"
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
              >
                <ArrowUp className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;