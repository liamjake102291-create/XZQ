import { useEffect, useState } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(sessionStorage.getItem('mb_loaded') ? 100 : 0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem('mb_loaded');
    const duration = seen ? 180 : 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem('mb_loaded', '1');
        setTimeout(() => setDone(true), seen ? 80 : 500);
      }
    };
    raf = requestAnimationFrame(tick);
    const hardStop = setTimeout(() => setDone(true), 2500);
    return () => { cancelAnimationFrame(raf); clearTimeout(hardStop); };
  }, []);
  if (done) return null;
  return <div className={`preloader ${progress === 100 ? 'is-done' : ''}`} aria-hidden="true">
    <div className="preloader-inner"><span>MIND BRIDGE</span><strong>{String(progress).padStart(3,'0')}</strong><i style={{ transform:`scaleX(${progress/100})` }} /></div>
  </div>;
}
