import { useEffect } from 'react';
import { X, Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectDetails({ id, onClose }) {
  const project = projects.find((p) => p.id === id);

  // Esc to close + lock scroll
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) {
    return (
      <div className="fixed inset-0 z-[60] grid place-items-center bg-ink-base/80 backdrop-blur-sm">
        <div className="bg-ink-surface border border-hair rounded-2xl p-10 max-w-md text-center">
          <p className="text-bone mb-6">Project not found.</p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-ember text-ink-base rounded-full text-sm"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const hasGithub = !!project.githubUrl;
  const hasLive = !!project.liveUrl;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-ink-base/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
    >
      <div
        className="min-h-full flex items-start sm:items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-4xl bg-ink-surface border border-hair rounded-2xl overflow-hidden">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 grid place-items-center h-10 w-10 rounded-full bg-ink-base/70 text-bone hover:bg-ember hover:text-ink-base transition-colors"
          >
            <X size={18} />
          </button>

          {/* Hero image / fallback */}
          <div className="relative aspect-[16/9] bg-ink-base overflow-hidden">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            <div
              className={[
                'absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-raised to-ink-base',
                project.thumbnail ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              <span className="font-display tracking-tightest text-bone/15 text-[12%] px-6 text-center leading-none">
                {project.title}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-bone-muted hover:text-ember transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Back to projects
            </button>

            <span className="text-[10px] tracking-[0.25em] uppercase text-ember">
              {project.category}
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl tracking-tightest text-bone">
              {project.title}
            </h2>

            <p className="mt-5 text-bone/75 leading-relaxed text-lg">
              {project.longDescription || project.description}
            </p>

            {project.technologies?.length ? (
              <div className="mt-7">
                <p className="text-xs tracking-[0.25em] uppercase text-bone-muted mb-3">
                  Technologies
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li
                      key={t}
                      className="px-3 py-1 rounded-full border border-hair text-sm text-bone/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {hasLive ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-ember text-ink-base rounded-full text-sm hover:bg-ember-soft transition-colors"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              ) : null}
              {hasGithub ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-hair text-bone rounded-full text-sm hover:border-ember hover:text-ember transition-colors"
                >
                  <Github size={15} /> GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
