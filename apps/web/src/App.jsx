import React, { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeContext';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';

const AboutSection = React.lazy(() => import('@/components/AboutSection.jsx'));
const SkillsSection = React.lazy(() => import('@/components/SkillsSection.jsx'));
const ProjectsSection = React.lazy(() => import('@/components/ProjectsSection.jsx'));
const ContactSection = React.lazy(() => import('@/components/ContactSection.jsx'));
const CustomCursor = React.lazy(() => import('@/components/CustomCursor.jsx'));
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Helmet>
          <title>Prajal Gautam - Frontend Developer & React Enthusiast</title>
          <meta
            name="description"
            content="Portfolio of Prajal Gautam, a Frontend Developer specializing in React, UI/UX, and building beautiful, performant digital experiences."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Helmet>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <HeroSection />
            <Suspense fallback={<div aria-hidden className="h-24" />}>
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </Suspense>
          </main>
          <Footer />
        </div>
        <Suspense>
          {/* Mount custom cursor only on pointer devices to avoid blocking render on touch */}
          <PointerCursor />
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function PointerCursor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
        setShow(fine);
      } catch (e) {
        setShow(false);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <Suspense>
      <CustomCursor />
    </Suspense>
  );
}

export default App;