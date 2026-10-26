import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section spy
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
        scrolled
          ? 'bg-ink-base/85 backdrop-blur-md border-b border-hair'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto max-w-shell px-5 sm:px-8 h-16 flex items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={go('home')}
          className="group flex items-center gap-3"
        >
          <span className="grid place-items-center h-9 w-9 rounded-full bg-ember text-ink-base font-display text-sm tracking-tighter transition-transform duration-300 group-hover:scale-105">
            NK
          </span>
          <span className="font-display text-bone text-base tracking-tight">
            NAGARAJ K H
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="relative text-sm text-bone/70 hover:text-bone transition-colors duration-200 py-1"
              >
                {l.label}
                <span
                  className={[
                    'absolute left-0 -bottom-0.5 h-px bg-ember transition-all duration-300',
                    active === l.id ? 'w-full' : 'w-0',
                  ].join(' ')}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden grid place-items-center h-10 w-10 -mr-2 text-bone"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={[
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!open}
      >
        <ul className="bg-ink-surface border-b border-hair px-5 py-4 space-y-1">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="block py-3 font-display tracking-tight text-2xl text-bone/80 hover:text-ember transition-colors"
              >
                {l.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
