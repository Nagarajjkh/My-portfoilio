import { useEffect, useRef } from 'react';

/**
 * Dot Grid Warp cursor — a field-class cursor effect.
 * A static dot grid; each dot is pushed away from the pointer along the
 * vector between them and swells as it flees. Pure vanilla canvas, no libs.
 *
 * Accessibility:
 *  - never hides the native cursor (no `cursor: none`)
 *  - additive overlay: position:fixed, pointer-events:none, aria-hidden
 *  - respects prefers-reduced-motion (static grid or nothing)
 *  - only mounts on (hover: hover) and (pointer: fine) pointers
 */
export default function DotGridCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Reduced motion: show a static, non-animated grid (covers the need; native cursor stays).
    if (reduce.matches) {
      drawStaticGrid(canvasRef.current);
      const onResize = () => drawStaticGrid(canvasRef.current);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    // Touch / coarse pointer: don't mount the animated effect at all.
    if (!finePointer.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GAP = 16;
    const REACH = 70;
    const PUSH = 28;
    const DOT = 1;
    const COLOR = '#ffffff';
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let basePositions = []; // {x,y} in CSS px

    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      cols = Math.ceil(width / GAP) + 1;
      rows = Math.ceil(height / GAP) + 1;
      basePositions = new Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          basePositions[r * cols + c] = { x: c * GAP, y: r * GAP };
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = COLOR;

      for (let i = 0; i < basePositions.length; i++) {
        const base = basePositions[i];
        let dx = 0;
        let dy = 0;
        let scale = 1;

        if (pointer.active) {
          const vx = base.x - pointer.x;
          const vy = base.y - pointer.y;
          const dist = Math.hypot(vx, vy);
          if (dist < REACH && dist > 0.0001) {
            const strength = 1 - dist / REACH; // 0..1
            const push = strength * PUSH;
            dx = (vx / dist) * push;
            dy = (vy / dist) * push;
            scale = 1 + strength * 2.4; // swell as it flees
          }
        }

        const x = base.x + dx;
        const y = base.y + dy;
        const r = (DOT * scale) / 2;
        if (r > 0) {
          ctx.globalAlpha = pointer.active ? 0.55 + Math.min(0.45, scale / 6) : 0.5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
    }
    function onResize() {
      resize();
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointercancel', onLeave);
    window.addEventListener('resize', onResize);

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onMQ = (ev) => {
      // If pointer becomes coarse mid-session, stop the loop.
      if (!ev.matches) {
        cancelAnimationFrame(raf);
        ctx && ctx.clearRect(0, 0, width, height);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else mq.addListener(onMQ);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointercancel', onLeave);
      window.removeEventListener('resize', onResize);
      if (mq.removeEventListener) mq.removeEventListener('change', onMQ);
      else mq.removeListener(onMQ);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  );
}

function drawStaticGrid(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const GAP = 16;
  const DOT = 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = Math.floor(w * DPR);
  canvas.height = Math.floor(h * DPR);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let y = 0; y <= h; y += GAP) {
    for (let x = 0; x <= w; x += GAP) {
      ctx.beginPath();
      ctx.arc(x, y, DOT / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
