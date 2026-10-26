import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { honors } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export function Honors() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!root.current || !track.current || matchMedia('(max-width:1023px), (prefers-reduced-motion:reduce)').matches) return;
    const section = root.current;
    const rail = track.current;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, rail.scrollWidth - innerWidth + parseFloat(getComputedStyle(section).paddingRight));
      gsap.to(rail, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${distance()}`,
          pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            setCurrent(Math.min(7, Math.floor(self.progress * 7) + 1));
          },
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return <section ref={root} className="honors section" aria-labelledby="honors-title">
    <div className="section-head"><span className="eyebrow">03 / SELECTED HONORS</span><h2 id="honors-title">荣誉与成果</h2></div>
    <div ref={track} className="honor-track">{honors.map(([title, tag], i) => <article className="honor-card" key={title}><span className="honor-index">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><div className="honor-tag">{tag}</div></article>)}</div>
    <div className="track-meta"><div className="track-progress"><span ref={progress} /></div><span>{String(current).padStart(2, '0')} / 07</span></div>
  </section>;
}
