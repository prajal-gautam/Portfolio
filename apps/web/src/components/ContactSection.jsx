import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Send, Instagram, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message Sent! 🚀',
        description: "Thanks for reaching out! I'll get back to you soon.",
        className: "bg-green-500 text-white border-none",
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const inputVariants = {
    focused: { scale: 1.02, borderColor: "#3b82f6", boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" },
    unfocused: { scale: 1, borderColor: "rgba(51, 65, 85, 0.5)", boxShadow: "none" }
  };

  const labelVariants = {
    focused: { y: -5, color: "#60a5fa" },
    unfocused: { y: 0, color: "#e2e8f0" }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-slate-900/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Let's Build Something Great
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's connect and create something amazing together.
          </p>
          <motion.div 
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="rounded-xl border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription className="text-slate-300">
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <motion.div animate={focusedField === 'name' || formData.name ? "focused" : "unfocused"} variants={labelVariants}>
                    <Label htmlFor="name">Name</Label>
                  </motion.div>
                  <motion.div animate={focusedField === 'name' ? "focused" : "unfocused"} variants={inputVariants}>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      className={`rounded-lg bg-slate-900/50 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <motion.div animate={focusedField === 'email' || formData.email ? "focused" : "unfocused"} variants={labelVariants}>
                    <Label htmlFor="email">Email</Label>
                  </motion.div>
                  <motion.div animate={focusedField === 'email' ? "focused" : "unfocused"} variants={inputVariants}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your.email@example.com"
                      className={`rounded-lg bg-slate-900/50 transition-colors ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </motion.div>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <motion.div animate={focusedField === 'message' || formData.message ? "focused" : "unfocused"} variants={labelVariants}>
                    <Label htmlFor="message">Message</Label>
                  </motion.div>
                  <motion.div animate={focusedField === 'message' ? "focused" : "unfocused"} variants={inputVariants}>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      className={`rounded-lg bg-slate-900/50 transition-colors min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                    />
                  </motion.div>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[48px] bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 text-lg font-medium rounded-lg transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                      >
                        <Loader2 className="w-5 h-5 mr-2" />
                        Sending...
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-700/50">
                <p className="text-center text-slate-300 mb-6">Or connect with me on:</p>
                <div className="flex gap-8 justify-center">
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
                    >
                      <Icon className="w-8 h-8" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;