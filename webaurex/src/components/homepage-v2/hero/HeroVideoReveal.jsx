"use client";

import { useEffect, useRef } from "react";
import createVideoRenderer from "./createVideoRenderer";
import styles from "./Hero.module.css";

export default function HeroVideoReveal({ src, poster, paused, onPlaybackBlocked }) {
  const wrapper = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const playback = useRef({ paused, update: () => {} });

  useEffect(() => {
    const layer = wrapper.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const playbackState = playback.current;
    const hero = layer.closest("section");
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer = createVideoRenderer(canvas, video);
    layer.dataset.renderer = renderer ? "loading" : "fallback";
    let visible = true;
    let disposed = false;
    let animation = 0;
    let previous = 0;
    let elapsed = 0;
    let touching = false;
    let lastInteraction = -10000;
    let rect = hero.getBoundingClientRect();
    const target = { x: rect.width * .5, y: rect.height * .38, strength: 0 };
    const points = Array.from({ length: 7 }, () => ({ ...target }));
    const trail = new Float32Array(21);
    const velocity = { x: 0, y: 0 };

    function wake() {
      if (!animation && visible && !document.hidden && !disposed) animation = requestAnimationFrame(render);
    }

    function render(now) {
      animation = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = Math.min(48, previous ? now - previous : 16.7);
      previous = now;
      if (!playbackState.paused && !reduced.matches) elapsed += delta;
      const idle = coarse.matches && !touching && !playbackState.paused && !reduced.matches;
      if (idle && now - lastInteraction > 1800) {
        // Touch devices get a slow, local sweep without intercepting page scrolling.
        target.x = rect.width * (.5 + Math.sin(elapsed * .00028) * .26);
        target.y = rect.height * (.38 + Math.cos(elapsed * .00036) * .12);
        target.strength = .68;
      } else if (coarse.matches && !touching) target.strength = 0;
      const oldX = points[0].x;
      const oldY = points[0].y;
      for (let i = 0; i < points.length; i++) {
        const leader = i === 0 ? target : points[i - 1];
        const point = points[i];
        const ease = reduced.matches ? 1 : 1 - Math.exp(-delta / (i === 0 ? 65 : 68));
        point.x += (leader.x - point.x) * ease;
        point.y += (leader.y - point.y) * ease;
        point.strength += (leader.strength - point.strength) * (reduced.matches ? 1 : 1 - Math.exp(-delta / 110));
        trail[i * 3] = point.x;
        trail[i * 3 + 1] = point.y;
        trail[i * 3 + 2] = point.strength;
      }
      velocity.x += ((points[0].x - oldX) / delta - velocity.x) * .18;
      velocity.y += ((points[0].y - oldY) / delta - velocity.y) * .18;
      if (renderer) {
        try {
          if (renderer.draw({ trail, velocity, time: elapsed / 1000, coarse: coarse.matches, reduced: reduced.matches })) layer.dataset.renderer = "webgl";
        } catch {
          renderer.dispose();
          renderer = null;
          layer.dataset.renderer = "fallback";
        }
      }
      const settling = points.some((point) => Math.abs(point.strength - target.strength) > .002 || (point.strength > .002 && Math.hypot(point.x - target.x, point.y - target.y) > .2));
      if (renderer && (settling || !video.paused || (target.strength > .002 && !reduced.matches && !playbackState.paused))) wake();
    }

    function updatePlayback() {
      // Keep the decoder warm while another homepage section is visible. Pausing
      // here caused a visible restart hitch when scrolling back into the hero.
      if (playbackState.paused || document.hidden) video.pause();
      else video.play().then(wake).catch(() => {
        if (!disposed && !document.hidden && !playbackState.paused) onPlaybackBlocked();
      });
      wake();
    }
    playbackState.update = updatePlayback;

    function resize() {
      rect = hero.getBoundingClientRect();
      renderer?.resize(rect.width, rect.height);
      wake();
    }
    function point(event) {
      if (coarse.matches && !touching) return;
      rect = hero.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      target.strength = 1;
      lastInteraction = performance.now();
      wake();
    }
    function leave() {
      touching = false;
      target.strength = 0;
      lastInteraction = performance.now();
      wake();
    }
    function touch(event) {
      if (!coarse.matches) return;
      touching = true;
      point(event);
    }
    function release() { if (coarse.matches) leave(); }
    function visibility() { previous = 0; updatePlayback(); }
    function ready() { wake(); }
    function mediaChange() { leave(); updatePlayback(); }
    function loseContext(event) {
      event.preventDefault();
      renderer?.dispose();
      renderer = null;
      layer.dataset.renderer = "fallback";
    }
    function restoreContext() {
      renderer = createVideoRenderer(canvas, video);
      layer.dataset.renderer = renderer ? "loading" : "fallback";
      resize();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { cancelAnimationFrame(animation); animation = 0; target.strength = 0; }
      else previous = 0;
      if (visible) wake();
    }, { threshold: 0 });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(hero);
    sizeObserver.observe(hero);
    hero.addEventListener("pointermove", point, { passive: true });
    hero.addEventListener("pointerleave", leave);
    hero.addEventListener("pointerdown", touch, { passive: true });
    hero.addEventListener("pointerup", release, { passive: true });
    hero.addEventListener("pointercancel", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    video.addEventListener("loadeddata", ready);
    video.addEventListener("seeked", ready);
    canvas.addEventListener("webglcontextlost", loseContext);
    canvas.addEventListener("webglcontextrestored", restoreContext);
    coarse.addEventListener("change", mediaChange);
    reduced.addEventListener("change", mediaChange);
    resize();
    updatePlayback();

    return () => {
      disposed = true;
      playbackState.update = () => {};
      cancelAnimationFrame(animation);
      video.pause();
      observer.disconnect();
      sizeObserver.disconnect();
      hero.removeEventListener("pointermove", point);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointerdown", touch);
      hero.removeEventListener("pointerup", release);
      hero.removeEventListener("pointercancel", leave);
      document.removeEventListener("visibilitychange", visibility);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("seeked", ready);
      canvas.removeEventListener("webglcontextlost", loseContext);
      canvas.removeEventListener("webglcontextrestored", restoreContext);
      coarse.removeEventListener("change", mediaChange);
      reduced.removeEventListener("change", mediaChange);
      renderer?.dispose();
      delete layer.dataset.renderer;
    };
  }, [onPlaybackBlocked]);

  useEffect(() => {
    playback.current.paused = paused;
    playback.current.update();
  }, [paused]);

  return (
    <div ref={wrapper} className={`v2-hero-media ${styles.media}`} aria-hidden="true">
      <video ref={videoRef} className={styles.video} src={src} poster={poster} muted loop playsInline preload="auto" tabIndex={-1} disablePictureInPicture />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
