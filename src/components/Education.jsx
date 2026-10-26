import { profile } from '@/data/profile';

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-32 bg-ink-surface scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          {profile.education.label}
        </p>
        <div className="reveal mb-12">
          <h2 className="font-display text-bone text-[clamp(2rem,6vw,4.5rem)] tracking-tightest leading-[0.95]">
            {profile.education.heading}
          </h2>
        </div>

        <div className="relative pl-6 border-l border-hair space-y-10">
          {profile.education.items.map((item) => (
            <div key={item.degree} className="reveal relative">
              <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-ember ring-4 ring-ink-surface" />
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-bone">
                {item.degree}
              </h3>
              <p className="mt-2 text-bone-muted">{item.institution}</p>
              {item.note ? (
                <p className="mt-1 text-xs tracking-[0.2em] uppercase text-ember/80">
                  {item.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
