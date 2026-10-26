import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../content/site';
gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(()=>{ const root=ref.current; if(!root)return; const ctx=gsap.context(()=>{
    root.querySelectorAll<HTMLElement>('[data-value]').forEach(el=>{ const end=Number(el.dataset.value); const state={n:0}; gsap.to(state,{n:end,duration:1.4,ease:'power3.out',snap:{n:1},scrollTrigger:{trigger:el,start:'top 80%',once:true},onUpdate:()=>{el.textContent=state.n.toLocaleString('zh-CN')}}); });
  },root); return()=>ctx.revert(); },[]);
  return <section ref={ref} className="stats section" aria-labelledby="stats-title"><div className="section-head"><span className="eyebrow">02 / IN NUMBERS</span><h2 id="stats-title">成果不是装饰，<br/>是做过事情的痕迹。</h2></div><div className="stats-grid">{stats.map(s=><div className="stat" key={s.en}><span className="stat-en">{s.en}</span><strong><span data-value={s.value}>0</span>{s.suffix}</strong><span className="stat-label">{s.label}</span></div>)}</div><p className="footnote">数据截至 2026 年秋季</p></section>;
}
