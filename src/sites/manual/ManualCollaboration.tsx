export default function ManualCollaboration() {
  return (
    <section aria-labelledby="collab-title" className="section scene scene-collab collaboration" id="collab">
      <div className="section-rail shell">
        <span className="rail-number">§ 03</span>
        <span className="rail-heading">С О Т Р У Д Н И Ч Е С Т В О / B 2 B</span>
        <span className="rail-end">КАК НАЧАТЬ РАБОТУ</span>
      </div>

      <div className="collab-body shell">
        <div className="collab-main">
          <span className="collab-kicker">НЕ ОБЯЗАТЕЛЬНО ОТДАВАТЬ ВЕСЬ ПРОЕКТ</span>
          <h2 id="collab-title">Можно начать<br />с одной задачи.</h2>
          <p>
            Подключусь к готовому макету, существующему сайту или отдельному участку продукта.
            Сначала фиксируем результат и границы работы — потом разработка.
          </p>
        </div>

        <div className="collab-side">
          <div className="offer-lines">
            <div>
              <span className="check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" /></svg></span>
              <span>Подключаюсь к готовому макету или существующему сайту</span>
            </div>
            <div>
              <span className="check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" /></svg></span>
              <span>Согласуем объём, результат и этапы до начала разработки</span>
            </div>
            <div>
              <span className="check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" /></svg></span>
              <span>Передаю исходный код и необходимые инструкции</span>
            </div>
          </div>

          <div className="collab-cta">
            <span className="collab-cta-label">ПРЯМАЯ СВЯЗЬ / БЕЗ ФОРМЫ И БРИФА НА 20 ПОЛЕЙ</span>
            <a className="button final-button" href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">
              Написать в Telegram <span>↗</span>
            </a>
          </div>
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
