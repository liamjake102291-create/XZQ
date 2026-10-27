import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bridge = useRef<SVGSVGElement>(null);
  const wordmark = `${import.meta.env.BASE_URL}brand-wordmark.webp`;
  const emblem = `${import.meta.env.BASE_URL}brand-emblem.webp`;
  const poster = `${import.meta.env.BASE_URL}media/poster.webp`;
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { yPercent: 110, duration: .95, stagger: .12, ease:'expo.out', delay:.25 });
      gsap.from('.hero-meta', { y: 18, opacity:0, duration:.8, ease:'expo.out', delay:.62 });
      if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
        gsap.to('.hero-copy', { y:-80, filter:'blur(5px)', opacity:.2, ease:'none', scrollTrigger:{ trigger:root, start:'top top', end:'60% top', scrub:1 } });
        gsap.to('.bridge', { scaleY:.86, y:40, opacity:.15, ease:'none', scrollTrigger:{ trigger:root, start:'top top', end:'60% top', scrub:1 } });
      }
    }, root);
    const move = (e: PointerEvent) => {
      if (!bridge.current || e.pointerType === 'touch') return;
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      bridge.current.style.transform = `translate3d(${x*16}px,${y*12}px,0) rotate(${x*.6}deg)`;
    };
    addEventListener('pointermove', move, { passive:true });
    return () => { ctx.revert(); removeEventListener('pointermove', move); };
  }, []);
  return <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
    <img className="hero-poster" src={poster} alt="" aria-hidden="true" fetchPriority="high" />
    <div className="hero-brand-art" aria-hidden="true"><img src={emblem} alt="" /></div>
    <div className="bridge" aria-hidden="true">
      <svg ref={bridge} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="bridge-gradient"><stop offset="0" stopColor="#E9A178" stopOpacity="0"/><stop offset=".28" stopColor="#E9A178"/><stop offset=".5" stopColor="#F2EFE7"/><stop offset=".72" stopColor="#E9A178"/><stop offset="1" stopColor="#E9A178" stopOpacity="0"/></linearGradient><filter id="blur10"><feGaussianBlur stdDeviation="10"/></filter><filter id="blur24"><feGaussianBlur stdDeviation="24"/></filter></defs>
        <path className="bridge-glow bridge-glow-wide" d="M -100 760 C 380 760 600 400 800 372 C 1000 400 1220 760 1700 760"/>
        <path className="bridge-glow" d="M -100 760 C 380 760 600 400 800 372 C 1000 400 1220 760 1700 760"/>
        <path className="bridge-core" d="M -100 760 C 380 760 600 400 800 372 C 1000 400 1220 760 1700 760"/>
      </svg>
    </div>
    <div className="hero-vignette" aria-hidden="true" />
    <div className="hero-copy">
      <img className="hero-wordmark hero-meta" src={wordmark} alt="心智桥工作室" fetchPriority="high" />
      <h1 id="hero-title"><span className="line-mask"><span className="hero-line">让想法发生</span></span><span className="line-mask"><span className="hero-line">让热爱有回响</span></span></h1>
      <p className="hero-meta">心理学 × 人工智能 × 校园创新 · 一支学生团队</p>
      <div className="hero-actions hero-meta"><a className="button button-primary" href="#tracks" data-cursor="OPEN"><span>查看 7 道命题</span></a><a className="button button-ghost" href="#apply" data-cursor="报名">扫码报名</a></div>
    </div>
    <a className="scroll-hint" href="#who"><span>SCROLL</span><i /></a>
  </section>;
}
