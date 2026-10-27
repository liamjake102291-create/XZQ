import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  ['team-award.webp', '创新创意方案类一等奖', '把想法带到更大的舞台'],
  ['team-seminar.webp', '心理健康工作研讨', '在交流中积累专业经验'],
  ['team-525.webp', '5·25 心理健康日', '让心理健康活动走近同学'],
  ['team-innovation.webp', '创新创业赛事', '用真实项目检验创意'],
  ['team-network.webp', '网络文化技术创新大会', '技术、心理与传播彼此连接'],
  ['team-campus.webp', '校园团队合影', '一起做事，也一起成长'],
] as const;

export function TeamGallery() {
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
        const endingInset = parseFloat(getComputedStyle(section).paddingRight) || 0;
        return Math.max(0, rail.scrollWidth - document.documentElement.clientWidth + endingInset);
      };
      gsap.to(rail, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top',
          end: () => `+=${Math.max(distance(), innerHeight * .9)}`,
          pin: true, scrub: matchMedia('(max-width:767px)').matches ? .55 : 1,
          anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
            setCurrent(Math.min(scenes.length, Math.floor(self.progress * scenes.length) + 1));
          },
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return <section ref={root} className="team-gallery section" aria-labelledby="team-gallery-title">
    <div className="section-head"><span className="eyebrow">03B / TOGETHER IN ACTION</span><h2 id="team-gallery-title">我们一起，<br/>把想法做成现场。</h2></div>
    <div className="team-viewport"><div ref={track} className="team-track">{scenes.map(([image,title,desc],i)=><figure className="team-card" key={image}>
      <img src={`${import.meta.env.BASE_URL}media/${image}`} alt={title} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
      <figcaption><span>{String(i + 1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{desc}</p></div></figcaption>
    </figure>)}</div></div>
    <div className="track-meta"><div className="track-progress"><span ref={progress}/></div><span>{String(current).padStart(2,'0')} / {String(scenes.length).padStart(2,'0')}</span></div>
  </section>;
}
