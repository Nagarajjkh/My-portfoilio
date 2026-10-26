import { skills } from '@/data/skills';
import SpringHeading from './SpringHeading';

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 bg-ink-surface scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          Tech Stack
        </p>
        <div className="reveal">
          <SpringHeading
            as="h2"
            className="font-display text-bone text-[clamp(2rem,6vw,4.5rem)] tracking-tightest"
          >
            TOOLS I USE TO BUILD.
          </SpringHeading>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hair border border-hair rounded-2xl overflow-hidden">
          {skills.map((group, gi) => (
            <div
              key={group.group}
              className="reveal bg-ink-raised p-7 sm:p-8 flex flex-col"
              style={{ transitionDelay: `${gi * 90}ms` }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-ember mb-5">
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-1.5 rounded-full border border-hair text-sm text-bone/85 hover:border-ember hover:text-ember transition-colors"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
