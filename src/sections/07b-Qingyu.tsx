import { useState } from 'react';
export function Qingyu() {
  const [retry,setRetry]=useState(false);
  return <div className="qingyu"><div className="qingyu-label">命题素材 · 虚构示例</div><div className="message me">{retry?'我想先同步下进度，看看卡在哪，我们一起排个时间？':'你这周能把负责的部分先做完吗？'}</div><div className="message them">{retry?'其实……是我不知道从哪开始。':'我最近真的挺忙的……'}<span>{retry?'松动':'抵触'}</span></div>{!retry&&<button type="button" onClick={()=>setRetry(true)}>暂停重试</button>}<small>「晴屿」为命题 04 的虚构素材，非真实产品</small></div>;
}
