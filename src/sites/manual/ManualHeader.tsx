// Existing section hierarchy, with a clear navigation / contact distinction.
export default function ManualHeader() {
  return (
    <header className="mast shell" id="top">
      <a aria-label="KROFN — наверх" className="brand" href="#top">
        <strong>KROFN</strong><span className="brand-divider">—</span>
        <span className="real-name">Сергей Красковский</span>
      </a>
      <nav aria-label="Основная навигация" className="main-nav">
        <a href="#cases"><span className="nav-index">§02</span> Кейсы</a>
        <a href="#collab"><span className="nav-index">§03</span> Сотрудничество</a>
        <a className="nav-contact" href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">Написать <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
