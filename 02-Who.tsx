import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';

export function Who() {
  const ref = useRef<HTMLElement>(null); useReveal(ref);
  const copy = [
    '我们不从“你已经会什么”开始问。心智桥工作室是一支融合心理学、人工智能与校园创新的学生团队，聚焦 AI 心理成长产品研发、校园心理健康活动与公益实践。做东西之前，我们先去问：身边的人到底卡在哪里。',
    '所以我们做的东西很具体：一个能在对话里反复练习表达的 AI，一场让人愿意排队参加的心理游园会，一份真的被用起来的调研。以真实需求为起点，让创意落地，让科技更有温度。',
    '我们不希望用一张试卷定义你的能力，也不要求你已经有丰富的项目经验。'
  ];
  return <section id="who" ref={ref} className="who section" aria-labelledby="who-title">
    <div className="who-signal"><div><span /><i /></div><b>FROM QUESTION<br/>TO ACTION</b></div>
    <div className="who-copy">
      <div className="eyebrow">01 / WHO WE ARE</div>
      <h2 id="who-title" data-reveal>先看见问题，<br/>再动手造桥。</h2>
      <div className="who-body">{copy.map((p,i)=><article key={i} data-reveal><span>0{i+1}</span><p>{p}</p></article>)}</div>
      <blockquote data-reveal>能力可以培养，经验可以积累，而好奇心、主动性与创造力，值得被看见。</blockquote>
    </div>
  </section>;
}
