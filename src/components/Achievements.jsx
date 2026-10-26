import { profile } from '@/data/profile';

export default function Achievements() {
  return (
    <section
      id="growth"
      className="relative py-24 sm:py-32 bg-ink-base scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          {profile.growth.label}
        </p>
        <div className="reveal mb-10">
          <h2 className="font-display text-bone text-[clamp(2rem,6vw,4.5rem)] tracking-tightest leading-[0.95]">
            {profile.growth.heading}
          </h2>
        </div>
        <p className="reveal max-w-2xl text-bone-muted text-lg mb-12">
          {profile.growth.body}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.growth.milestones.map((m, i) => (
            <div
              key={m.title}
              className="reveal p-7 bg-ink-raised border border-hair rounded-2xl"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-display text-5xl text-ember/30 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl tracking-tight text-bone">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-bone-muted leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
