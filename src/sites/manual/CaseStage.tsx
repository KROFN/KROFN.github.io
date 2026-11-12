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
  const sectionRef = useRef<HTMLElement | null>(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktop = window.matchMedia("(min-width: 901px)");
    let raf = 0;

    const updateFromScroll = () => {
      raf = 0;
      if (!desktop.matches) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const next = Math.round(progress * (manualCases.length - 1));

      if (rect.top <= 1 && rect.bottom >= window.innerHeight - 1) {
        setActive((current) => (current === next ? current : next));
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [setActive]);

  const select = useCallback(
    (requested: number, syncScroll = true) => {
      const index = (requested + manualCases.length) % manualCases.length;
      setActive(index);

      if (!syncScroll || !window.matchMedia("(min-width: 901px)").matches) return;

      const section = sectionRef.current;
      if (!section) return;

      const maxTravel = Math.max(0, section.offsetHeight - window.innerHeight);
      const fraction = manualCases.length === 1 ? 0 : index / (manualCases.length - 1);
      window.scrollTo({
        top: section.offsetTop + maxTravel * fraction,
        behavior: "smooth",
      });
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
      select(active + (dx < 0 ? 1 : -1), false);
    }
  };

  return (
    <>
      <section
        aria-labelledby="case-name"
        className="section scene scene-cases projects"
        id="cases"
        ref={sectionRef}
      >
        <div className="case-stage-sticky">
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
              <button type="button" aria-label="Предыдущий кейс" onClick={() => select(active - 1, false)}>←</button>
              <span>0{active + 1} / 03</span>
              <button type="button" aria-label="Следующий кейс" onClick={() => select(active + 1, false)}>→</button>
            </div>
          </div>

          <div className="case-state shell" key={item.id}>
            <div className="case-copy">
              <div className="case-title-wrap">
                <span className="eyebrow case-eyebrow">0{active + 1} / РАЗРАБОТКА И ДИЗАЙН</span>
                <h2 id="case-name">{item.name}</h2>
              </div>

              <div className="case-mini-facts">
                <div><span>ТИП</span><strong>{item.type}</strong></div>
                <div><span>РОЛЬ</span><strong>{item.role}</strong></div>
                <div><span>СТАТУС</span><strong>{item.status}</strong></div>
              </div>

              <div className="case-analysis">
                <div className="technical-label">
                  <strong>ТЕХНИЧЕСКИЙ<br />РАЗБОР</strong>
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

              <div className="case-links">
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
            </div>

            <div className="case-visual">
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

              <div className="case-note-single" aria-label="Редакционная аннотация">
                <span>{item.annotationRight.join(" ")}</span>
                <svg aria-hidden="true" viewBox="0 0 120 54">
                  <path d="M112 8 C82 8 58 16 35 35 M44 25 L35 35 L50 39" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mobile-case-editorial shell">
            <div className="mobile-note">{item.mobileNote}</div>
          </div>

          <div className="case-scroll-cue" aria-hidden="true">
            <span>SCROLL / СМЕНА КЕЙСА</span>
            <i>↓</i>
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
