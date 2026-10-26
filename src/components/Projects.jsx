import { useMemo, useState } from 'react';
import { projects, projectCategories } from '@/data/projects';
import SpringHeading from './SpringHeading';
import ProjectCard from './ProjectCard';

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 bg-ink-base scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          Selected Projects
        </p>
        <div className="reveal">
          <SpringHeading
            as="h2"
            className="font-display text-bone text-[clamp(2rem,6vw,4.5rem)] tracking-tightest"
          >
            IDEAS MADE REAL.
          </SpringHeading>
        </div>
        <p className="reveal mt-6 max-w-2xl text-bone-muted text-lg">
          A collection of websites, experiments, and applications built while
          exploring technology and solving practical problems.
        </p>

        {/* Filters */}
        <div className="reveal mt-10 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={[
                'px-3.5 py-1.5 text-xs tracking-wide rounded-full border transition-colors',
                filter === c
                  ? 'bg-ember text-ink-base border-ember'
                  : 'border-hair text-bone/70 hover:border-ember/50 hover:text-bone',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <ProjectCard project={p} onOpen={() => onOpen?.(p.id)} />
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-bone-muted text-sm mt-10">No projects here yet.</p>
        ) : null}
      </div>
    </section>
  );
}
