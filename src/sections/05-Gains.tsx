import { gains } from '../content/site';

export function Gains() {
  return <section className="gains section" aria-labelledby="gains-title">
    <img className="section-mascot mascot-gains" src={`${import.meta.env.BASE_URL}media/mascot-finish.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    <div className="section-head gains-heading"><span className="eyebrow">04 / WHAT YOU GET</span><h2 id="gains-title">加入心智桥，<br/>你将获得什么</h2><p>在真实任务里学习，在共同完成一件事的过程中建立能力、作品与连接。</p></div>
    <div className="gain-grid">{gains.map((gain, i) => <article className="gain-card" key={gain.title}>
      <div className="gain-top"><span className="gain-index">{String(i + 1).padStart(2, '0')}</span><span className="eyebrow">{gain.code}</span></div>
      <div className="gain-copy"><h3>{gain.title}</h3><p>{gain.desc}</p><ul>{gain.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </article>)}</div>
  </section>;
}
