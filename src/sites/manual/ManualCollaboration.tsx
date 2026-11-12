export default function ManualCollaboration() {
  return (
    <section aria-labelledby="collab-title" className="section scene scene-collab collaboration" id="collab">
      <div className="section-rail shell">
        <span className="rail-number">§ 03</span>
        <span className="rail-heading">С О Т Р У Д Н И Ч Е С Т В О / B 2 B</span>
        <span className="rail-end">КАК НАЧАТЬ РАБОТУ</span>
      </div>

      <div className="collab-workorder shell">
        <header className="collab-workorder-head">
          <span className="collab-kicker">НЕ ОБЯЗАТЕЛЬНО ОТДАВАТЬ ВЕСЬ ПРОЕКТ</span>
          <h2 id="collab-title">Можно начать<br />с одного экрана.</h2>
          <p>
            Готовый макет, существующий сайт или отдельная задача — нормальная точка входа.
            До разработки фиксируем, что именно должно получиться.
          </p>
        </header>

        <div className="collab-process">
          <div className="collab-process-step">
            <span>01 / ВХОД</span>
            <strong>Что передаёшь</strong>
            <p>Макет, текущий сайт или конкретный участок продукта.</p>
          </div>
          <div className="collab-process-step">
            <span>02 / ГРАНИЦЫ</span>
            <strong>Что фиксируем</strong>
            <p>Объём, результат и этапы до начала разработки.</p>
          </div>
          <div className="collab-process-step">
            <span>03 / ПЕРЕДАЧА</span>
            <strong>Что получаешь</strong>
            <p>Исходный код и необходимые инструкции по проекту.</p>
          </div>
        </div>

        <div className="collab-workorder-cta">
          <div>
            <span>ПРЯМАЯ СВЯЗЬ / БЕЗ ФОРМЫ НА 20 ПОЛЕЙ</span>
            <strong>Опиши задачу как есть.</strong>
          </div>
          <a href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">
            <span>Написать в Telegram</span>
            <b>↗</b>
          </a>
        </div>
      </div>

      <footer className="site-footer shell">
        <div className="footer-left">
          <strong>KROFN</strong>
          <span>Сергей Красковский / frontend-разработка</span>
        </div>
        <div className="footer-right">
          <a href="https://github.com/KROFN" rel="noreferrer" target="_blank">GITHUB ↗</a>
          <a href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">TELEGRAM ↗</a>
          <a href="#top">↑ НАВЕРХ</a>
        </div>
      </footer>
    </section>
  );
}
