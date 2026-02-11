import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Github, Linkedin, Download, Mail, Instagram } from 'lucide-react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const lines = [
    'Frontend Developer',
    'React Enthusiast',
    'UI/UX Focused'
  ];

  useEffect(() => {
    const currentLine = lines[lineIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && charIndex === currentLine.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLineIndex((prev) => (prev + 1) % lines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentLine.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
          description: 'Your resume download should start shortly.',
          className: 'bg-green-500 text-white border-none',
        });
        return;
      }

      toast({
        title: 'Resume not found',
        description: 'Resume file is missing. You can contact me from the contact form.',
        className: 'bg-yellow-500 text-black border-none',
      });
      scrollToSection('contact');
    } catch (err) {
      toast({
        title: 'Download failed',
        description: 'Unable to download resume. Please try again or contact me.',
        className: 'bg-red-500 text-white border-none',
      });
      scrollToSection('contact');
    }
  };

  // Floating particles configuration
  const particles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden py-20 md:py-0"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 z-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/10 blur-xl"
          style={{
            width: particle.size * 4,
            height: particle.size * 4,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Background Glow Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight"
          >
            {Array.from("Hi, I'm Prajal Gautam").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03, duration: 0.5 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-12 md:h-20 mb-6 md:mb-8 flex items-center justify-center"
          >
            <p className="text-xl sm:text-2xl md:text-4xl font-semibold text-blue-400">
              {displayText}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block w-1 h-8 bg-blue-400 align-middle"
              />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto px-4"
          >
            I'm a Frontend Developer passionate about building beautiful, performant user interfaces. I specialize in React and modern web technologies to create seamless digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 relative overflow-hidden group"
              onClick={() => scrollToSection('projects')}
            >
              <span className="relative z-10">View Projects</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400 transition-all"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto text-slate-300 hover:text-white hover:bg-slate-800/50"
              onClick={handleDownloadResume}
              aria-label="Download resume"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex gap-6 justify-center items-center"
          >
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
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;