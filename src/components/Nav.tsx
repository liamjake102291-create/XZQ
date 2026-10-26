export function Nav() {
  const wordmark = `${import.meta.env.BASE_URL}brand-wordmark.webp`;
  return <header className="nav">
    <a className="brand" href="#top" data-cursor="OPEN"><img className="brand-wordmark" src={wordmark} alt="心智桥工作室" /><span className="brand-en">MIND BRIDGE STUDIO</span></a>
    <div className="nav-status"><span className="status-dot" />2026 秋季招新</div>
  </header>;
}
