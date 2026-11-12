export default function ManualCollaboration() {
  return (
    <section aria-labelledby="collab-title" className="section scene scene-collab collaboration" id="collab">
      <div className="section-rail shell">
        <span className="rail-number">§ 03</span>
        <span className="rail-heading">П Е Р Е Д А Ч А / В / Р А Б О Т У</span>
        <span className="rail-end">КАК НАЧАТЬ РАБОТУ</span>
      </div>

      <div className="handoff-sheet shell">
        <div className="handoff-head">
          <span className="handoff-index">03 / HANDOFF</span>
          <span className="collab-kicker">НЕ НУЖНО ОТДАВАТЬ ВЕСЬ ПРОЕКТ</span>
          <h2 id="collab-title">
            Есть один экран?
            <br />
            <em>Этого уже достаточно.</em>
          </h2>
          <p>
            Можно начать с готового макета, существующего сайта или отдельной задачи.
            Сначала фиксируем результат и границы работы — потом разработка.
          </p>
        </div>

        <div className="handoff-flow" aria-label="Как начинается работа">
          <div className="handoff-column handoff-in">
            <div className="handoff-column-head">
              <span>ВХОД / 01</span>
              <b>Что можно передать</b>
            </div>
            <div className="handoff-token-row">
              <span>ГОТОВЫЙ МАКЕТ</span>
              <span>ТЕКУЩИЙ САЙТ</span>
              <span>ОТДЕЛЬНАЯ ЗАДАЧА</span>
            </div>
            <p>Не нужен отдельный «идеальный» бриф перед первым сообщением.</p>
          </div>

          <div className="handoff-transfer" aria-hidden="true">
            <span>→</span>
            <small>РАЗРАБОТКА</small>
          </div>

          <div className="handoff-column handoff-out">
            <div className="handoff-column-head">
              <span>ВЫХОД / 02</span>
              <b>Что фиксируем</b>
            </div>
            <div className="handoff-result-list">
              <div><i>01</i><span>Объём и ожидаемый результат</span></div>
              <div><i>02</i><span>Этапы до начала разработки</span></div>
              <div><i>03</i><span>Исходный код и инструкции по передаче</span></div>
            </div>
          </div>
        </div>

        <div className="handoff-action">
          <div className="handoff-action-copy">
            <span>ПРЯМАЯ СВЯЗЬ / БЕЗ ФОРМЫ НА 20 ПОЛЕЙ</span>
            <strong>Опиши задачу как есть.</strong>
          </div>
          <a className="handoff-button" href="https://t.me/krofn_dev" rel="noreferrer" target="_blank">
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
