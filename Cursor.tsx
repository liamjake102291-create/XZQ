import { useEffect, useRef, useState } from 'react';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return;
    let rx = 0, ry = 0, mx = 0, my = 0, raf = 0;
    const move = (event: MouseEvent) => {
      mx = event.clientX; my = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0)`;
      const target = (event.target as Element).closest('a,button,[data-cursor]');
      setLabel(target?.getAttribute('data-cursor') || (target ? 'OPEN' : ''));
    };
    const tick = () => {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    addEventListener('mousemove', move, { passive: true }); tick();
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className={`cursor-ring ${label ? 'is-active' : ''}`}><span>{label}</span></div></>;
}
