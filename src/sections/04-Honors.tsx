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
    if (!root.current || !track.current || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const section = root.current;
    const rail = track.current;
    const ctx = gsap.context(() => {
      const distance = () => {
        const styles = getComputedStyle(section);
        const endingInset = parseFloat(styles.paddingRight) || 0;
        return Math.max(0, rail.scrollWidth - document.documentElement.clientWidth + endingInset);
      };
      gsap.to(rail, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(distance(), innerHeight * .9)}`,
          pin: true,
          scrub: matchMedia('(max-width:767px)').matches ? .55 : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            setCurrent(Math.min(honors.length, Math.floor(self.progress * honors.length) + 1));
          },
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return <section ref={root} className="honors section" aria-labelledby="honors-title">
    <div className="section-head"><span className="eyebrow">03 / SELECTED HONORS</span><h2 id="honors-title">荣誉与成果</h2></div>
    <div className="honor-viewport"><div ref={track} className="honor-track">{honors.map(([title, tag], i) => <article className="honor-card" key={title}><span className="honor-index">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><div className="honor-tag">{tag}</div></article>)}</div></div>
    <div className="track-meta"><div className="track-progress"><span ref={progress} /></div><span>{String(current).padStart(2, '0')} / {String(honors.length).padStart(2, '0')}</span></div>
  </section>;
}
