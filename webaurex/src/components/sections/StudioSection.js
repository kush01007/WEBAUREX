"use client";
import { useState } from "react";
import { Arrow, Reveal } from "./SectionReveal";
const steps = [
  { title: "Get curious.", label: "Discovery", copy: "We ask the questions, challenge the obvious, and find the thing that makes your brand yours." },
  { title: "Find the feeling.", label: "Direction", copy: "Mood, message, and a point of view. We shape a visual world before getting lost in the details." },
  { title: "Make it real.", label: "Design & build", copy: "From expressive layouts to thoughtful interactions, the idea becomes an experience you can touch." },
  { title: "Send it out.", label: "Launch", copy: "The finishing touches, the final checks, and a confident first hello to the world." },
];
export default function StudioSection() {
  const [active, setActive] = useState(0);
  return <section id="studio" className="ax-studio ax-pad" aria-labelledby="studio-heading">
    <div className="ax-section-meta"><span>04 / The way we work</span><span>Small team energy. Big picture thinking.</span></div>
    <div className="ax-studio-grid"><Reveal><span className="ax-tiny ax-overline">Less passing the brief. More sharing the vision.</span><h2 id="studio-heading" className="ax-display">On your side.<br /><span className="ax-serif">In our element.</span></h2><p className="ax-studio-intro">We’re an independent creative studio for people building something they believe in. No layers. No disappearing acts. Just a close collaboration and a healthy obsession with getting it right.</p><div className="ax-studio-values"><span>Independent in spirit</span><span>Connected by design</span><span>Curious, always</span></div></Reveal>
      <Reveal className="ax-orbit-card"><span className="ax-tiny">The Webaurex way</span><div className="ax-orbit-scene" aria-hidden="true"><div className="ax-orbit-globe">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ "--ring": i }} />)}</div><span className="ax-orbit-center">w.</span><span className="ax-orbit-word ax-orbit-word-1">Curiosity</span><span className="ax-orbit-word ax-orbit-word-2">Craft</span><span className="ax-orbit-word ax-orbit-word-3">Connection</span><span className="ax-orbit-spark">✳</span></div><div className="ax-orbit-caption"><span>Different minds.<br />One shared orbit.</span><Arrow /></div></Reveal></div>
    <div className="ax-process-heading"><span className="ax-tiny">From “what if” to “here it is”</span><span className="ax-tiny">A little structure. A lot of possibility.</span></div>
    <div className="ax-process-grid">{steps.map((step, i) => <button key={step.title} className="ax-process-card" data-active={active === i} aria-pressed={active === i} onClick={() => setActive(i)}><span className="ax-process-top"><span className="ax-tiny">0{i + 1} / {step.label}</span><Arrow /></span><h3>{step.title}</h3><p>{step.copy}</p><span className="ax-process-line" aria-hidden="true" /></button>)}</div>
  </section>;
}