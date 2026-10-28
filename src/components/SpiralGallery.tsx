import { useRef, useState } from 'react';

const photos = [
  ['team-award.webp', '创新创意方案类一等奖', '把想法带到更大的舞台'],
  ['team-seminar.webp', '心理健康工作研讨', '在交流中积累专业经验'],
  ['team-525.webp', '5·25 心理健康日', '让心理健康活动走近同学'],
  ['team-innovation.webp', '创新创业赛事', '用真实项目检验创意'],
  ['team-network.webp', '网络文化技术创新大会', '技术、心理与传播彼此连接'],
  ['team-campus.webp', '校园团队合影', '一起做事，也一起成长'],
] as const;

export function SpiralGallery() {
  const [current, setCurrent] = useState(0);
  const [large, setLarge] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const step = (next: number) => setCurrent(Math.max(0, Math.min(photos.length - 1, next)));
  const position = (index: number) => {
    const distance = index - current;
    const angle = distance * 1.12;
    const x = Math.sin(angle) * Math.min(280, innerWidth * .23);
    const z = Math.cos(angle) * 170 - 170;
    const y = distance * 62;
    const scale = Math.max(.62, 1 - Math.abs(distance) * .1);
    return {
      transform: `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),${z}px) rotateY(${-Math.sin(angle) * 34}deg) scale(${scale})`,
      zIndex: 20 - Math.abs(distance),
      opacity: Math.abs(distance) > 3 ? .12 : 1 - Math.abs(distance) * .16,
    };
  };

  return <section className="spiral-section">
    <div className="spiral-heading">
      <div><span>INTERACTIVE ALBUM</span><h2>转动这条记忆螺旋</h2></div>
      <p>在相册区域滚动或左右拖动；到达首尾后，页面会继续正常滚动。点击照片可以放大。</p>
    </div>
    <div className="spiral-stage" tabIndex={0}
      onWheel={(event) => {
        if (wheelLock.current) return;
        const direction = Math.sign(event.deltaY);
        if ((direction > 0 && current < photos.length - 1) || (direction < 0 && current > 0)) {
          event.preventDefault(); wheelLock.current = true; step(current + direction);
          setTimeout(() => { wheelLock.current = false; }, 260);
        }
      }}
      onTouchStart={(event) => { touch.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touch.current === null) return;
        const dx = event.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 45) step(current + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}>
      <div className="spiral-axis" aria-hidden="true" />
      {photos.map(([image, title, desc], index) => <button
        className={`spiral-card ${index === current ? 'active' : ''}`}
        style={position(index)} onClick={() => index === current ? setLarge(index) : step(index)}
        key={image} aria-label={`${title}，${index === current ? '点击放大' : '点击切换'}`}>
        <img src={`${import.meta.env.BASE_URL}media/${image}`} alt="" loading={Math.abs(index-current)>1?'lazy':'eager'} />
        <span><small>0{index+1} / 0{photos.length}</small><b>{title}</b><em>{desc}</em></span>
      </button>)}
      <button className="spiral-prev" onClick={() => step(current-1)} disabled={current===0} aria-label="上一张">←</button>
      <button className="spiral-next" onClick={() => step(current+1)} disabled={current===photos.length-1} aria-label="下一张">→</button>
      <div className="spiral-count"><span style={{transform:`scaleX(${(current+1)/photos.length})`}}/><b>0{current+1} / 0{photos.length}</b></div>
    </div>
    {large !== null && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={photos[large][1]} onClick={() => setLarge(null)}>
      <button aria-label="关闭">×</button><img src={`${import.meta.env.BASE_URL}media/${photos[large][0]}`} alt={photos[large][1]}/><p>{photos[large][1]} · {photos[large][2]}</p>
    </div>}
  </section>;
}
