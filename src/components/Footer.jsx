import { profile } from '@/data/profile';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id) => (e) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-ink-base border-t border-hair">
      <div className="mx-auto max-w-shell px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-ember text-ink-base font-display text-sm">
                {profile.monogram}
              </span>
              <span className="font-display text-bone text-lg tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="mt-4 text-bone-muted text-sm max-w-xs">
              Building, learning, and shipping one project at a time.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="text-sm text-bone/70 hover:text-ember transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-hair flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-bone-muted">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-bone-muted">
            Designed &amp; built with intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
