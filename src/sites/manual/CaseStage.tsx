import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction, type KeyboardEvent, type TouchEvent } from "react";
import { manualCases } from "./content";
import type { ManualCase } from "./content";

const ASSET_ROOT = "/media/manual/assets/";

function InkLines({ lines }: { lines: readonly string[] }) {
  return <>{lines.map((line, i) => <span key={i}>{line}{i < lines.length - 1 ? <br /> : null}</span>)}</>;
}
function CaseMedia({item}: {item: ManualCase}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [item.id]);
  return (
    <div className={`preview preview-${item.id} is-visible${failed ? " missing-authentic-media" : ""}`} data-testid="current-case-media">
      {!failed && <img key={item.id} src={item.media.src} srcSet={item.media.srcSet} sizes={item.media.sizes} alt={item.mediaAlt} loading={item.id === "sirius" ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className={item.id === "sirius" ? undefined : "project-authentic"} />}
      {failed && <span className="media-error" role="status">Исходное изображение недоступно</span>}
      <span className="media-watermark">{item.id === "sirius" ? "КОНЦЕПТ / НЕ LIVE-СКРИНШОТ" : item.id === "laniakea" ? "СКРИНШОТ ЛОКАЛЬНОЙ СБОРКИ" : "СКРИНШОТ ИСХОДНОГО ПРОЕКТА"}</span>
    </div>
  );
}
function ProjectImageDialog({ item, dialogRef, onClose }: {item: ManualCase;dialogRef: React.RefObject<HTMLDialogElement | null>; onClose:()=>void}) {
  return <dialog className="media-dialog" ref={dialogRef} aria-label="Полное изображение проекта" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
    <div className="media-dialog-bar"><strong>{item.name} / ПОЛНОЕ ИЗОБРАЖЕНИЕ</strong><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть просмотр">✕ ЗАКРЫТЬ</button></div>
    <div className="media-dialog-scroll"><img src={item.media.full} alt={item.mediaAlt} decoding="async" /></div>
    <div className="media-dialog-foot"><span>{item.mediaCaption}</span><a href={item.media.full} target="_blank" rel="noopener noreferrer">Открыть оригинальный файл ↗</a></div>
  </dialog>;
}

export default function CaseStage({active, setActive}: {active: number;setActive: Dispatch<SetStateAction<number>>}) {
  const item = manualCases[active];
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const expandRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{x:number;y:number}|null>(null);
  const select = useCallback((n: number) => setActive((n + manualCases.length) % manualCases.length),[]);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); select(active + (e.key === "ArrowRight" ? 1 : -1));
    }
  };
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => { const t=e.changedTouches[0];touchStart.current={x:t.clientX,y:t.clientY}; };
  const onTouchEnd = (e:TouchEvent<HTMLDivElement>)=>{ const t=e.changedTouches[0];const start=touchStart.current;touchStart.current=null;if(!start)return;const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>52&&Math.abs(dx)>Math.abs(dy)*1.6) select(active+(dx<0?1:-1)); };
  return <>
  <section aria-labelledby="case-name" className="section projects" id="cases">
    <div className="section-rail shell"><span className="rail-number">§ 02</span><span className="rail-heading">К Е Й С / П Р О Е К Т Ы</span><span className="rail-end">ИЗБРАННОЕ / 03 РАБОТЫ</span></div>
    <div className="case-heading shell">
      <div className="case-title-wrap"><span className="eyebrow case-eyebrow">0{active+1} / РАЗРАБОТКА И ДИЗАЙН</span><h2 id="case-name">{item.name}</h2><img alt="" aria-hidden="true" className="annotation case-underline" src={ASSET_ROOT+"sirius-underline.png"}/></div>
      <div className="case-mini-facts"><div><span>ТИП</span><strong>{item.type}</strong></div><div><span>РОЛЬ</span><strong>{item.role}</strong></div><div><span>СТАТУС</span><strong>{item.status}</strong></div></div>
    </div>
    <div className="case-center shell">
      <div className="outer-annotation left"><div aria-label="Редакционная аннотация" className="case-mark case-mark-left" data-active={item.id}>
        {active===0 && <img alt="" aria-hidden="true" className="approved-project-note" src={ASSET_ROOT+"case-left-note.png"}/>}
        <span className="case-mark-line"><InkLines lines={item.annotationLeft}/></span><svg aria-hidden="true" viewBox="0 0 140 100"><path d="M18 2 C2 43,22 75,90 86 M75 74 L90 86 L70 91"/></svg>
      </div></div>
      <div className="work-frame">
        <div aria-hidden="true" className="browser-chrome"><span className="dots"><i/><i/><i/></span><span className="chrome-title">{item.chrome}</span><span className="chrome-icons">↻</span></div>
        <div className="project-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><CaseMedia item={item} /></div>
        {active===0 && <div className="sirius-inspection" aria-label="Увеличенный фрагмент художественного концепта SIRIUS"><div className="sirius-detail"><img src={item.media.src} alt="Увеличенный фрагмент исходного концепта: заголовок SIRIUS, модель и студийный свет" loading="lazy"/></div><div className="sirius-detail-label"><strong>01 / ДЕТАЛЬ КАДРА</strong><span>Центральная композиция крупнее; полный кадр — выше.</span></div></div>}
        <div className="media-actions"><button type="button" className="media-expand" ref={expandRef} onClick={() => dialogRef.current?.showModal()} aria-haspopup="dialog">Рассмотреть изображение целиком <span aria-hidden="true">↗</span></button></div>
        <div className="work-media-caption">{item.mediaCaption}</div>
      </div>
      <div className="outer-annotation right"><div aria-label="Редакционная аннотация" className="case-mark case-mark-right"><span className="case-mark-line"><InkLines lines={item.annotationRight}/></span><svg aria-hidden="true" viewBox="0 0 140 100"><path d="M104 8 C136 45 95 75 30 83 M42 68 L30 83 L52 91"/></svg></div></div>
    </div>
    <div className="mobile-case-editorial shell"><div className="mobile-note">{item.mobileNote}</div><span className="mobile-proof">{item.mobileProof}</span></div>
    <div className="case-pagination shell" onKeyDown={onKeyDown}>
      <span className="pagination-label">ПЕРЕЛИСТАТЬ КЕЙС <b>↗</b></span>
      <div aria-label="Выбрать проект" className="case-pages" role="group">{manualCases.map((c,index)=><button key={c.id} type="button" className={`page-case${active===index?" active":""}`} aria-current={active===index?"true":undefined} onClick={()=>select(index)}><span>0{index+1}</span> {c.name}</button>)}</div>
      <div className="arrow-nav"><button type="button" aria-label="Предыдущий кейс" onClick={()=>select(active-1)}>←</button><span aria-live="polite">0{active+1} / 03</span><button type="button" aria-label="Следующий кейс" onClick={()=>select(active+1)}>→</button></div>
    </div>
    <div className="case-analysis shell">
      <div className="technical-label"><strong>ТЕХНИЧЕСКИЙ<br/>РАЗБОР</strong><span aria-hidden="true" className="hatch"/></div>
      <div className="technical-lines">{item.lines.map((line,index)=><div key={line}><span className={`check${item.id==="sirius"&&index===2?" outline":""}`}>{item.id==="sirius"&&index===2?"—":"✓"}</span><span>{line}</span></div>)}</div>
      <div aria-label="Комментарий к проекту" className="technical-annotation"><svg aria-hidden="true" viewBox="0 0 32 96"><path d="M20 3 C2 5 2 28 13 38 C24 45 16 47 13 49 C2 57 2 84 20 91"/></svg><span><InkLines lines={item.annotationTech}/></span></div>
    </div>
    <div className="case-links shell">
      {item.source && <a className="button button-dark" href={item.source.url} rel="noreferrer" target="_blank">{item.source.label} <span>↗</span></a>}
      {item.demo && <a className="button button-light" href={item.demo.url} rel="noreferrer" target="_blank">{item.demo.label} <span>↗</span></a>}
      <span className="project-disclaimer">{item.disclaimer}</span>
    </div>
  </section>
  <ProjectImageDialog item={item} dialogRef={dialogRef} onClose={() => expandRef.current?.focus()} />
  </>;
}
