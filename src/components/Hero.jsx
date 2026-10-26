import { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown, Github } from 'lucide-react';
import { profile } from '@/data/profile';
import SpringHeading from './SpringHeading';
import WhatsApp from './icons/WhatsApp';

const STAGGER = 81;

function RoleLabels({ roles }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let idx = 0;
    let timer;
    const tick = () => {
      idx = (idx + 1) % roles.length;
      setI(idx);
      timer = setTimeout(tick, 2600);
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [roles.length, reduce]);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {roles.map((r, idx) => (
        <span
          key={r}
          className={[
            'text-xs sm:text-sm tracking-[0.25em] uppercase transition-opacity duration-700',
            idx === i ? 'text-ember opacity-100' : 'text-bone-muted opacity-50',
          ].join(' ')}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-ink-base"
    >
      {/* bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-base to-transparent" />

      <div className="mx-auto max-w-shell w-full px-5 sm:px-8 pt-24 pb-16">
        <RoleLabels roles={profile.roles} />

        <div className="mt-6">
          <SpringHeading
            as="h1"
            stagger={STAGGER}
            className="font-display text-ember leading-[0.85] tracking-tightest justify-center sm:justify-start text-[clamp(3.5rem,15vw,12rem)]"
          >
            NAGARAJ
          </SpringHeading>
          <SpringHeading
            as="h1"
            stagger={STAGGER}
            delay={420}
            className="font-display text-bone leading-[0.85] tracking-tightest justify-center sm:justify-start text-[clamp(3.5rem,15vw,12rem)]"
          >
            KH
          </SpringHeading>
        </div>

        <div className="mt-8 max-w-2xl">
          <p
            className="reveal text-base sm:text-lg text-bone/80 leading-relaxed"
            style={{ transitionDelay: '500ms' }}
          >
            {profile.heroIntro}
          </p>
        </div>

        <div
          className="reveal mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          style={{ transitionDelay: '650ms' }}
        >
          <a
            href="#projects"
            onClick={scrollTo('projects')}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-ember text-ink-base font-medium text-sm tracking-wide rounded-full hover:bg-ember-soft transition-colors"
          >
            Explore My Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            onClick={scrollTo('contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-hair text-bone font-medium text-sm tracking-wide rounded-full hover:border-ember hover:text-ember transition-colors"
          >
            Contact Me
          </a>
          <a
            href={profile.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Nagaraj on WhatsApp"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-[#075E54] font-semibold text-sm tracking-wide rounded-full hover:bg-[#1ebe57] transition-colors"
          >
            <WhatsApp size={16} />
            Chat on WhatsApp
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Nagaraj's GitHub profile"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-hair text-bone font-medium text-sm tracking-wide rounded-full hover:border-ember hover:text-ember transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        onClick={scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bone-muted hover:text-bone transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={16} className="scroll-hint" />
      </a>
    </section>
  );
}
