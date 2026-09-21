import { useState } from "react";
import { ArrowDown, ArrowUpRight, Shuffle, Volume2, VolumeX, X } from "lucide-react";
import ClickerCanvas from "@/components/clicker/ClickerCanvas";
import ControlPanel from "@/components/clicker/ControlPanel";
import { useClickerConfig } from "@/hooks/useClickerConfig";

export default function Index() {
  const state = useClickerConfig();
  const [customizing, setCustomizing] = useState(false);
  return (
    <main className="playground">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="boringg home">boringg<span>✳</span></a>
        <span className="header-note">A SMALL BREAK FROM EVERYTHING.</span>
        <button className="sound-button" onClick={() => state.setMuted(!state.muted)} aria-label={state.muted ? "Turn sound on" : "Mute sound"}>
          {state.muted ? <VolumeX size={17} /> : <Volume2 size={17} />}<span>sound {state.muted ? "off" : "on"}</span>
        </button>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> ZERO PURPOSE. VERY GOOD FEELING.</p>
          <h1 id="hero-title">Less doing.<br />More <span>nothing.</span><svg viewBox="0 0 350 18" aria-hidden="true"><path d="M5 12 Q160 -2 342 9 M18 16 Q175 5 318 14" /></svg></h1>
          <p className="intro">A little button for your very busy brain.<br />Give it a press. That’s the whole thing.</p>
          <button className="press-button" onClick={state.press}>I’m bored. <ArrowUpRight size={22} /></button>
          <p className="keyboard-hint">or press <kbd>space</kbd> · headphones encouraged</p>
          <div className="small-note">↳ No goals. No streak to lose.<br /><span>You’re doing wonderfully nothing.</span></div>
        </div>
        <div className="toy-stage">
          <div className="stage-top"><span>THE NOTHING MACHINE</span><span>NO. 001</span></div>
          <div className="toy-canvas"><ClickerCanvas config={state.config} pressTick={state.pressTick} onPress={state.press} /></div>
          <div className="toy-sticker">100%<span>pleasantly<br />pointless</span></div>
          <div className="stage-bottom"><span>✳ &nbsp; made to be pressed</span><span>move to admire ↔</span></div>
        </div>
      </section>
      <section className="play-bar" aria-label="Your play session">
        <div className="counter"><span className="counter-number">{String(state.presses).padStart(3, "0")}</span><div>little moments of nothing<span>{state.presses ? "Time well wasted." : "Your first one is on us."}</span></div></div>
        <div className="play-actions"><button onClick={state.randomize}><Shuffle size={17} /> Surprise me</button><button className="customize" aria-expanded={customizing} aria-controls="customizer" onClick={() => setCustomizing(!customizing)}>Make it yours {customizing ? <X size={17} /> : <ArrowDown size={17} />}</button></div>
      </section>
      {customizing && <section id="customizer" className="customizer"><ControlPanel {...state} /></section>}
      <footer className="site-footer"><span>IN A WORLD OF MORE, HERE’S A LITTLE LESS.</span><span>An experiment in doing absolutely nothing. <span className="footer-flower">✳</span></span></footer>
    </main>
  );
}
