import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-bone-muted border border-hair px-2 py-1 rounded-full">
      <span className="h-1.5 w-1.5 rounded-full bg-ember" />
      {status}
    </span>
  );
}

function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-ink-base bg-ember px-2 py-1 rounded-full">
      Featured
    </span>
  );
}

function Thumbnail({ project }) {
  const hasImg = !!project.thumbnail;
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-ink-base">
      {hasImg ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      {/* Fallback: typographic preview, always behind the image when present */}
      <div
        className={[
          'absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-raised to-ink-base',
          hasImg ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <span className="font-display tracking-tightest text-bone/15 text-[18%] leading-none px-4 text-center">
          {project.title}
        </span>
      </div>

      {/* badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        {project.featured ? <FeaturedBadge /> : null}
        {project.status ? <StatusBadge status={project.status} /> : null}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onOpen }) {
  const hasGithub = !!project.githubUrl;
  const hasLive = !!project.liveUrl;

  return (
    <article className="group flex flex-col bg-ink-raised border border-hair rounded-2xl overflow-hidden transition-colors duration-300 hover:border-ember/40">
      <button
        type="button"
        onClick={onOpen}
        className="block text-left w-full"
        aria-label={`View details for ${project.title}`}
      >
        <Thumbnail project={project} />
      </button>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] tracking-[0.25em] uppercase text-ember">
            {project.category}
          </span>
          {onOpen ? (
            <button
              type="button"
              onClick={onOpen}
              className="text-bone-muted hover:text-ember transition-colors"
              aria-label={`Open ${project.title} details`}
            >
              <ArrowUpRight size={18} />
            </button>
          ) : null}
        </div>

        <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-bone group-hover:text-ember transition-colors duration-300">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-bone-muted leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {project.technologies?.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="text-[11px] px-2 py-0.5 rounded border border-hair text-bone/70"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex items-center gap-2 pt-5 border-t border-hair">
          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-bone/80 hover:text-ember transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          ) : null}
          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-bone/80 hover:text-ember transition-colors ml-auto"
            >
              <Github size={14} /> GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
