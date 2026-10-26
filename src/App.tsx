import { useCallback, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import DotGridCursor from '@/components/DotGridCursor';
import ProjectDetails from '@/pages/ProjectDetails';
import { useReveal } from '@/hooks/useReveal';

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  useReveal();

  // Re-run reveal observation when a project modal closes (in case layout shifted).
  useEffect(() => {
    if (activeProject === null) {
      const els = document.querySelectorAll('.reveal:not(.is-visible)');
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
  }, [activeProject]);

  const openProject = useCallback((id: string) => setActiveProject(id), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <div className="relative min-h-screen bg-ink-base text-bone bg-wash">
      <DotGridCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects onOpen={openProject} />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />

      {activeProject ? (
        <ProjectDetails id={activeProject} onClose={closeProject} />
      ) : null}
    </div>
  );
}
