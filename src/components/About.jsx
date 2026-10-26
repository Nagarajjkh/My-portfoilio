import { profile } from '@/data/profile';
import SpringHeading from './SpringHeading';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-ink-base scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          {profile.about ? '' : ''}
          About Me
        </p>

        <div className="reveal">
          <SpringHeading
            as="h2"
            className="font-display text-bone text-[clamp(2rem,6vw,4.5rem)] tracking-tightest"
          >
            {profile.about.heading}
          </SpringHeading>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="reveal text-lg sm:text-xl text-bone/75 leading-relaxed">
              {profile.about.body}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-hair">
            <p className="reveal text-xs tracking-[0.3em] text-bone-muted uppercase mb-5">
              Interests
            </p>
            <ul className="space-y-3">
              {profile.about.interests.map((it) => (
                <li
                  key={it}
                  className="reveal flex items-center gap-3 text-bone/80"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
