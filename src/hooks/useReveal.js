import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook. Adds `is-visible` to elements with the `reveal` class
 * once they enter the viewport. Respects prefers-reduced-motion (elements stay
 * visible because the CSS disables the hidden initial state under reduced motion).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Single-element reveal helper returning a ref + visible flag. */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target);
        }
      },
      options ?? { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [options]);
  return [ref, inView];
}
