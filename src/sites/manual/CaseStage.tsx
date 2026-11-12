import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  type TouchEvent,
} from "react";
import { manualCases } from "./content";
import type { ManualCase } from "./content";

function CaseMedia({ item }: { item: ManualCase }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [item.id]);

  return (
    <div
      className={`preview preview-${item.id} is-visible${failed ? " missing-authentic-media" : ""}`}
      data-testid="current-case-media"
    >
      {!failed && (
        <img
          key={item.id}
          src={item.media.src}
          srcSet={item.media.srcSet}
          sizes={item.media.sizes}
          alt={item.mediaAlt}
          loading={item.id === "sirius" ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={item.id === "sirius" ? undefined : "project-authentic"}
        />
      )}
      {failed && <span className="media-error" role="status">Исходное изображение недоступно</span>}
    </div>
  );
}

function ProjectImageDialog({
  item,
  dialogRef,
  onClose,
}: {
  item: ManualCase;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      className="media-dialog"
      ref={dialogRef}
      aria-label="Полное изображение проекта"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="media-dialog-bar">
        <strong>{item.name} / ПОЛНОЕ ИЗОБРАЖЕНИЕ</strong>
        <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть просмотр">
          ✕ ЗАКРЫТЬ
        </button>
      </div>
      <div className="media-dialog-scroll">
        <img src={item.media.full} alt={item.mediaAlt} decoding="async" />
      </div>
      <div className="media-dialog-foot">
        <span>{item.mediaCaption}</span>
        <a href={item.media.full} target="_blank" rel="noopener noreferrer">Открыть оригинальный файл ↗</a>
      </div>
    </dialog>
  );
}

export default function CaseStage({
  active,
  setActive,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}) {
  const item = manualCases[active];
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const expandRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const previews = manualCases
      .filter((c) => c.id !== item.id)
      .map((c) => {
        const picture = new Image();
        picture.src = c.media.src;
        return picture;
      });

    return () => {
      previews.forEach((picture) => {
        picture.onload = null;
        picture.onerror = null;
      });
    };
  }, [item.id]);

  const select = useCallback(
    (requested: number) => {
      const index = (requested + manualCases.length) % manualCases.length;
      setActive(index);
    },
    [setActive],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      select(active + (event.key === "ArrowRight" ? 1 : -1));
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      select(active + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <>
      <section aria-labelledby="case-name" className="section scene scene-cases projects" id="cases">
        <div className="section-rail shell">
          <span className="rail-number">§ 02</span>
          <span className="rail-heading">К Е Й С / П Р О Е К Т Ы</span>
          <span className="rail-end">ИЗБРАННОЕ / 03 РАБОТЫ</span>
        </div>

        <div className="case-stage-nav shell" onKeyDown={onKeyDown}>
          <div className="case-progress" aria-live="polite">
            <strong>0{active + 1}</strong><span>/ 03</span>
            <i aria-hidden="true"><b style={{ width: `${((active + 1) / manualCases.length) * 100}%` }} /></i>
          </div>

          <div aria-label="Выбрать проект" className="case-pages" role="group">
            {manualCases.map((currentCase, index) => (
              <button
                key={currentCase.id}
                type="button"
                className={`page-case${active === index ? " active" : ""}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => select(index)}
              >
                <span>0{index + 1}</span> {currentCase.name}
              </button>
            ))}
          </div>

          <div className="arrow-nav">
            <button type="button" aria-label="Предыдущий кейс" onClick={() => select(active - 1)}>←</button>
            <span>0{active + 1} / 03</span>
            <button type="button" aria-label="Следующий кейс" onClick={() => select(active + 1)}>→</button>
          </div>
        </div>

        <div className={`case-editorial-spread case-spread-${item.id} shell`} key={item.id}>
          <div className="case-serial" aria-hidden="true">
            <span>CASE</span>
            <strong>0{active + 1}</strong>
          </div>

          <header className="case-editorial-title">
            <span className="eyebrow">0{active + 1} / РАЗРАБОТКА И ДИЗАЙН</span>
            <h2 id="case-name">{item.name}</h2>
            <span className="case-proof-stamp">{item.mobileProof}</span>
          </header>

          <div className="case-editorial-media">
            <div className="work-frame">
              <div aria-hidden="true" className="browser-chrome">
                <span className="chrome-kicker">PROJECT VIEW</span>
                <span className="chrome-title">{item.chrome}</span>
              </div>

              <div className="project-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <CaseMedia item={item} />
                <button
                  type="button"
                  className="preview-open"
                  aria-label={"Открыть полный кадр проекта " + item.name}
                  onClick={() => dialogRef.current?.showModal()}
                />
              </div>

              <div className="media-actions">
                <button
                  type="button"
                  className="media-expand"
                  ref={expandRef}
                  onClick={() => dialogRef.current?.showModal()}
                  aria-haspopup="dialog"
                >
                  Рассмотреть изображение целиком <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>

          <aside className="case-editorial-facts">
            <div>
              <span>ТИП</span>
              <strong>{item.type}</strong>
            </div>
            <div>
              <span>РОЛЬ</span>
              <strong>{item.role}</strong>
            </div>
            <div>
              <span>СТАТУС</span>
              <strong>{item.status}</strong>
            </div>
          </aside>

          <div className="case-editorial-analysis">
            <div className="technical-label">
              <strong>ТЕХНИЧЕСКИЙ РАЗБОР</strong>
              <span aria-hidden="true" className="hatch" />
            </div>
            <div className="technical-lines">
              {item.lines.map((line, index) => (
                <div key={line}>
                  <span
                    className={"check" + (item.id === "sirius" && index === 2 ? " outline" : "")}
                    aria-hidden="true"
                  >
                    {item.id === "sirius" && index === 2 ? (
                      <svg viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" /></svg>
                    )}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="case-editorial-links">
            {item.source && (
              <a className="button button-dark" href={item.source.url} rel="noreferrer" target="_blank">
                {item.source.label} <span>↗</span>
              </a>
            )}
            {item.demo && (
              <a className="button button-light" href={item.demo.url} rel="noreferrer" target="_blank">
                {item.demo.label} <span>↗</span>
              </a>
            )}
          </div>

          <div className="case-editorial-note" aria-hidden="true">
            <b>{item.annotationTech.join(" ")}</b>
            <span>{item.mobileNote}</span>
          </div>
        </div>
      </section>

      <ProjectImageDialog
        item={item}
        dialogRef={dialogRef}
        onClose={() => expandRef.current?.focus()}
      />
    </>
  );
}
