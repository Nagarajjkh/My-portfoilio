import { useEffect, useRef, useState } from 'react';
import '../styles/spring-reveal.css';

/**
 * SpringHeading — reproduces the "Rise & Settle" effect:
 * splits the text into letters and springs each one from its "out" state
 * (opacity 0, y +24) to its "in" state (opacity 1, y 0) with a per-letter
 * stagger. Motion is driven by CSS transitions (interruptible, GPU-light);
 * reduced-motion shows the text statically.
 *
 * Centering uses className="justify-center" (the container is display:flex).
 */
const STAGGER = 81; // ms per letter

function splitToLetters(text) {
  // Preserve spaces as word separators. Each word is a masked inline-block
  // so letters rise out of / slide in from behind the word's edge (overflow).
  const words = String(text).split(/(\s+)/);
  return words.map((word, wi) => {
    if (/^\s+$/.test(word)) {
      return { type: 'space', key: `s${wi}`, text: word };
    }
    return {
      type: 'word',
      key: `w${wi}`,
      chars: Array.from(word).map((ch, ci) => ({
        ch,
        key: `w${wi}c${ci}`,
      })),
    };
  });
}

export default function SpringHeading({
  as: Tag = 'h2',
  children,
  className = '',
  stagger = STAGGER,
  delay = 0,
  ...rest
}) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const tokens = splitToLetters(text);
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Flatten letters to assign staggered transition-delay across the whole line.
  let letterIndex = -1;
  const baseDelay = delay;

  return (
    <Tag
      ref={wrapRef}
      className={`str-wrap justify-center ${className}`}
      {...rest}
    >
      {tokens.map((tok) => {
        if (tok.type === 'space') {
          return (
            <span key={tok.key} aria-hidden="true" style={{ width: '0.3em' }} />
          );
        }
        return (
          <span
            key={tok.key}
            className={`str-word ${inView ? 'is-in' : ''}`}
            aria-hidden="true"
          >
            {tok.chars.map((c) => {
              letterIndex += 1;
              const d = baseDelay + letterIndex * stagger;
              return (
                <span
                  key={c.key}
                  className="str-letter"
                  style={{ transitionDelay: `${d}ms` }}
                >
                  {c.ch}
                </span>
              );
            })}
          </span>
        );
      })}
      {/* Accessible static text for screen readers */}
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        {text}
      </span>
    </Tag>
  );
}
