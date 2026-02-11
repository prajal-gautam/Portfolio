import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, Github, Linkedin, Instagram, Download } from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const { toast } = useToast();

  const handleDownloadResume = async () => {
    try {
      const res = await fetch('/resume.pdf', { method: 'HEAD' });
      if (res.ok) {
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = 'Prajal_Gautam_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast({
          title: 'Resume downloaded',
          description: 'Your resume download should begin shortly.',
          className: 'bg-green-500 text-white border-none',
        });
        return;
      }

      toast({
        title: 'Resume not found',
        description: 'Resume file missing — use the contact form instead.',
        className: 'bg-yellow-500 text-black border-none',
      });
      scrollToSection('#contact');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not download resume.',
        className: 'bg-red-500 text-white border-none',
      });
      scrollToSection('#contact');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-slate-700/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Prajal Gautam
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-slate-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer text-sm lg:text-base relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            <div className="h-6 w-px bg-slate-700 mx-2" />

            <div className="flex items-center gap-3">
              {[
                { Icon: Github, href: "https://github.com/prajal-gautam", color: "hover:text-blue-400" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/prajal-gautam-272a603a8/", color: "hover:text-blue-400" },
                { Icon: Instagram, href: "https://www.instagram.com/prajal.xiv/", color: "hover:text-pink-500" }
              ].map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-400 hover:text-white transition-all ${color}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <motion.div className="ml-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDownloadResume}
                className="text-slate-300 hover:text-white"
                aria-label="Download resume"
              >
                <Download className="w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-300 hover:text-white transition-all duration-300 ml-2"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-300 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-[73px] left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 md:hidden h-screen z-40"
            >
              <div className="flex flex-col p-6 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-slate-300 hover:text-white transition-colors duration-300 font-medium text-lg py-2 cursor-pointer border-b border-slate-800"
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <div className="flex gap-6 pt-4 justify-center">
                  {[
                    { Icon: Github, href: "https://github.com/prajal-gautam" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/prajal-gautam-272a603a8/" },
                    { Icon: Instagram, href: "https://www.instagram.com/prajal.xiv/" }
                  ].map(({ Icon, href }, i) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;