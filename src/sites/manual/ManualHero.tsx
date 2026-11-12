export default function ManualHero() {
  return (
    <section aria-labelledby="intro-title" className="section scene scene-intro intro">
      <div className="section-rail shell">
        <span className="rail-number">§ 01</span>
        <span className="rail-heading">В В Е Д Е Н И Е</span>
        <span className="rail-end">ПРОФИЛЬ / WEB DEVELOPMENT</span>
      </div>

      <div className="intro-body shell">
        <aside className="intro-marginal">
          <div className="field-note"><span>НАПРАВЛЕНИЕ</span><strong>Вёрстка /<br />фронтенд</strong></div>
          <div className="field-note"><span>ТЕХНОЛОГИИ</span><strong>React<br />TypeScript</strong></div>
          <div className="field-note"><span>РАБОТА</span><strong>Подряд<br />для студий</strong></div>
        </aside>

        <div className="intro-content">
          <h1 id="intro-title">
            Забираю вёрстку и фронтенд <br />
            у веб-студий <span className="subcontract-word">на субподряд</span>
          </h1>
          <p className="lead">
            Разрабатываю адаптивные сайты и интерфейсы по макетам. Работаю с React и TypeScript,
            подключаюсь к проектам студий.
          </p>
          <div className="cta-line">
            <a className="button button-dark" href="#cases">Смотреть кейсы <span>↘</span></a>
            <a className="button button-light" href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">
              Написать в Telegram <span>➤</span>
            </a>
          </div>
        </div>

        <div aria-label="Рабочие слои: макет, интерфейс, код" className="layered-aside">
          <svg aria-label="Три уровня работы: дизайн, интерфейс, код" className="stack-drawing" role="img" viewBox="0 0 300 200">
            <g fill="none" stroke="#77736c" strokeWidth="1.1">
              <path d="M20 55 98 16 176 55 98 94Z" />
              <path d="M20 89 98 50 176 89 98 128Z" />
              <path d="M20 123 98 84 176 123 98 162Z" />
              <path d="m32 55 65-33 67 33-66 32Z" opacity=".32" />
              <path d="m30 89 68-33 65 33-65 32Z" opacity=".32" />
              <path d="m30 123 68-33 65 33-65 32Z" opacity=".32" />
              <path d="M176 55H216M176 89H216M176 123H216" strokeDasharray="2 3" />
              <circle cx="216" cy="55" fill="#393733" r="3" />
              <circle cx="216" cy="89" fill="#393733" r="3" />
              <circle cx="216" cy="123" fill="#393733" r="3" />
            </g>
            <g fill="#282724" fontFamily="Inter,Arial,sans-serif" fontSize="11">
              <text x="226" y="59">Figma</text>
              <text x="226" y="93">React</text>
              <text x="226" y="127">TS</text>
            </g>
          </svg>
          <img alt="" aria-hidden="true" className="annotation hero-hand" src="/media/manual/vector/hero-note.svg" />
        </div>
      </div>

      <div className="intro-ledger shell">
        <div><b>ЗАДАЧА:</b> Интерфейсы и адаптивная вёрстка</div>
        <div><b>ФОРМАТ:</b> Проектный субподряд</div>
        <div><b>СВЯЗЬ:</b> Напрямую с разработчиком</div>
      </div>

      <a className="scene-next" href="#cases" aria-label="Перейти к кейсам">
        <span>02</span><b>КЕЙСЫ / ПРОЕКТЫ</b><i>↓</i>
      </a>
    </section>
  );
}
