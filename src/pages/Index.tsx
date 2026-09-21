import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { playPress } from "@/lib/swoleAudio";

const SwoleToy = lazy(() => import("@/components/SwoleToy"));
const LIMIT = 24;

class ToyBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="toy-fallback" aria-hidden="true"><span /></div> : this.props.children; }
}

export default function Index() {
  const [presses, setPresses] = useState(0);
  const [tick, setTick] = useState(0);
  const [squeak, setSqueak] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = useRef(0);
  const resetUntil = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); clearTimeout(timer.current); };
  }, []);
  const press = useCallback(() => {
    if (performance.now() < resetUntil.current) return;
    const next = count.current + 1;
    const reset = next > LIMIT;
    count.current = reset ? 0 : next;
    setPresses(count.current);
    setTick(t => t + 1);
    setSqueak(reset);
    try { playPress(next / LIMIT, reset); } catch { /* The toy also works without audio. */ }
    clearTimeout(timer.current);
    if (reset) {
      resetUntil.current = performance.now() + 900;
      timer.current = setTimeout(() => setSqueak(false), 1800);
    }
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("button, a, input, textarea, select, [contenteditable]")) return;
      event.preventDefault();
      press();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);
  return (
    <main className={`nothing-page mood-${squeak ? "reset" : presses >= 18 ? "huge" : presses >= 9 ? "growing" : "small"}`}>
      <header className="masthead">
        <a href="/" className="brand" aria-label="boringg home">boringg<span className="brand-flower" aria-hidden="true">✳</span></a>
        <span className="edition">A VERY SERIOUS WASTE OF TIME™</span>
        <span className="corner-smile" aria-hidden="true">☺</span>
      </header>
      <div className="poster-copy"><span className="eyebrow">ONE BUTTON. ZERO REASONS.</span><h1>press me.</h1></div>
      <span className="side-note" aria-hidden="true">100% UNNECESSARY / 100% YES</span>
      <div className="doodle doodle-left" aria-hidden="true">✳</div>
      <div className="doodle doodle-right" aria-hidden="true">✦</div>
      <div className="toy-orbit" aria-hidden="true" />
      <span className="sticker" aria-hidden="true">DO NOT<br /><strong>OVERTHINK</strong><br />THE BUTTON.</span>
      <button className="toy-hit" onClick={press} aria-label="Press the button" style={{ "--growth": presses / LIMIT } as React.CSSProperties}>
        <ToyBoundary>
          <Suspense fallback={<div className="toy-fallback" aria-hidden="true"><span /></div>}>
            <SwoleToy growth={presses / LIMIT} tick={tick} tiny={squeak} reducedMotion={reducedMotion} />
          </Suspense>
        </ToyBoundary>
        {tick > 0 && !squeak && <span key={tick} className="comic-pop" aria-hidden="true">{presses >= 18 ? "ABSOLUTE UNIT." : presses >= 9 ? "OH. HELLO." : ["boop!", "again!", "nice.", "bonk!"][presses % 4]}</span>}
        <span className={squeak ? "squeak visible" : "squeak"} aria-hidden="true">squeak.<svg viewBox="0 0 50 40"><path d="M46 3Q15 4 8 32m-4-9 4 9 10-4" /></svg></span>
      </button>
      <span className="sr-only" role="status">{squeak ? "Squeak! Tiny again." : presses === LIMIT ? "One more press." : ""}</span>
      <footer className="poster-footer"><span>CLICK IT. THAT’S IT.</span><span className="key-hint">your spacebar works too ↗</span><span>PROUDLY POINTLESS. <b aria-hidden="true">✳</b></span></footer>
    </main>
  );
}
