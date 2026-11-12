import { useEffect, useState } from "react";
import ManualHeader from "./ManualHeader";
import ManualHero from "./ManualHero";
import CaseStage from "./CaseStage";
import ManualCollaboration from "./ManualCollaboration";
import "./ManualSite.css";

/** Approved KROFN Fidelity V3.1. All project interactions are React-owned. */
export default function ManualSite() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    document.body.dataset.route = "manual";
    document.body.classList.remove("has-custom-cursor");
    document.documentElement.lang = "ru";
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:"instant"}));
    } else {
      window.scrollTo(0,0);
    }
    return () => {delete document.body.dataset.route;};
  }, []);
  return (
    <div className="manual-root" lang="ru">
      <div className="sheet" data-slide={active}>
        <ManualHeader />
        <main><ManualHero/><CaseStage active={active} setActive={setActive}/><ManualCollaboration/></main>
      </div>
    </div>
  );
}
