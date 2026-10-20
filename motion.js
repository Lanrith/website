/* Optional, bounded motion and visitor-controlled architecture explanations. */
(() => {
  'use strict';

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const effects = new Map();
  const canMove = () => !preference.matches && !document.hidden;

  function cancelEffects() {
    for (const animation of effects.keys()) animation.cancel();
    effects.clear();
  }

  function animate(element, frames, options) {
    if (!element || !canMove() || !element.animate) return;
    const animation = element.animate(frames, options);
    effects.set(animation, element);
    animation.finished.then(() => {
      effects.delete(animation);
      animation.cancel();
    }, () => effects.delete(animation));
  }

  // Keep all three complete explanations in the source. Only enhance after
  // controls, panels, and listeners are available.
  const flow = document.querySelector('.system-flow');
  const controls = document.querySelector('.scene-controls');
  const panels = [...document.querySelectorAll('.flow-scene')];
  const buttons = [...document.querySelectorAll('[data-scene]')];
  if (flow && controls && panels.length === 3 && buttons.length === 3) {
    const status = flow.querySelector('.flow-status');
    let selected = 'readonly';

    function selectScene(name, announce = true) {
      selected = name;
      cancelEffects();
      for (const panel of panels) {
        const active = panel.id === `scene-${name}`;
        panel.setAttribute('aria-hidden', String(!active));
        panel.inert = !active;
      }
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.scene === name));
      }
      if (!announce) return;
      const button = buttons.find(item => item.dataset.scene === name);
      const label = [...button.childNodes]
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent).join('').trim();
      status.textContent = `${label} selected.`;
      const panel = panels.find(item => item.id === `scene-${name}`);
      const route = panel.querySelector('.active-route');
      const marker = panel.querySelector('.route-packet');
      if (route && marker) {
        const length = route.getTotalLength();
        const frames = Array.from({ length: 25 }, (_, index) => {
          const fraction = index / 24;
          const point = route.getPointAtLength(length * fraction);
          return {
            transform: `translate(${point.x}px, ${point.y}px)`,
            opacity: index === 0 || index === 24 ? 0 : 1,
            offset: fraction
          };
        });
        animate(marker, frames, { duration: 380, easing: 'linear' });
      } else {
        animate(panel.querySelector('.flow-route'), [{ opacity: .35 }, { opacity: 1 }], { duration: 240, easing });
      }
    }

    for (const button of buttons) {
      button.addEventListener('click', () => {
        if (button.dataset.scene !== selected) selectScene(button.dataset.scene);
      });
    }
    selectScene(selected, false);
    flow.classList.add('flow-enhanced');
    controls.hidden = false;
  }

  const hero = document.querySelector('.hero-art');
  const svg = hero?.querySelector('svg');
  const packetGroup = svg?.querySelector('.packets');
  const replay = document.querySelector('.replay');
  let frame = 0;
  let startedAt = null;
  let inView = false;
  let hasPlayed = false;

  function stopHero() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    startedAt = null;
    if (packetGroup) {
      packetGroup.setAttribute('opacity', '0');
      for (const packet of packetGroup.children) packet.removeAttribute('style');
    }
    replay?.setAttribute('aria-disabled', 'false');
    hero?.classList.remove('flow-running');
  }

  if (hero && svg && packetGroup && replay) {
    const packets = [...packetGroup.children];
    // Split the existing compound path; use the shared final 20-unit junction
    // for the Lab branch. The visible original SVG is left unchanged.
    const branchData = svg.querySelector('path').getAttribute('d').match(/M[^M]+/g);
    const paths = branchData.map((data, index) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', data + (index === 2 ? 'h20' : ''));
      return { path, length: path.getTotalLength() };
    });
    const exit = svg.querySelector('g > path:nth-child(2)');
    const exitLength = exit.getTotalLength();

    function startHero() {
      if (frame || !inView || !canMove()) return;
      hasPlayed = true;
      replay.setAttribute('aria-disabled', 'true');
      hero.classList.add('flow-running');
      packetGroup.setAttribute('opacity', '1');
      function tick(time) {
        if (!canMove() || !inView) { stopHero(); return; }
        if (startedAt === null) startedAt = time;
        const elapsed = time - startedAt;
        if (elapsed >= 2860) { stopHero(); return; }
        packets.forEach((packet, index) => {
          const age = elapsed - index * 320;
          let point;
          let opacity = 0;
          if (age >= 0 && age < 1450) {
            const fraction = age / 1450;
            point = paths[index].path.getPointAtLength(paths[index].length * fraction);
            opacity = Math.min(1, age / 90, (1450 - age) / 90);
          } else if (age >= 1660 && age < 2220) {
            const distance = (age - 1660) / 560;
            point = exit.getPointAtLength(exitLength * distance);
            opacity = Math.min(1, (age - 1660) / 60, (2220 - age) / 80);
          }
          if (point) {
            packet.setAttribute('cx', point.x);
            packet.setAttribute('cy', point.y);
          }
          packet.style.opacity = String(Math.max(0, opacity));
        });
        frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }
    replay.hidden = preference.matches || !('IntersectionObserver' in window);
    replay.addEventListener('click', startHero);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= .35;
        if (!inView) stopHero();
        else if (!hasPlayed) startHero();
      }, { threshold: [0, .35] });
      observer.observe(svg);
    }
    preference.addEventListener('change', () => {
      // Do not restart an interrupted or preference-suppressed first run.
      hasPlayed = true;
      stopHero();
      cancelEffects();
      replay.hidden = preference.matches || !('IntersectionObserver' in window);
    });
  }

  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveals.unobserve(entry.target);
        animate(entry.target, [{ transform: 'translateY(5px)' }, { transform: 'translateY(0)' }], { duration: 400, easing });
      }
    }, { threshold: .6 });
    document.querySelectorAll('[data-reveal]').forEach(element => reveals.observe(element));

    const exitObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) continue;
        for (const [animation, element] of effects) {
          if (entry.target.contains(element)) {
            animation.cancel();
            effects.delete(animation);
          }
        }
      }
    });
    document.querySelectorAll('.system-flow, .outcomes').forEach(element => exitObserver.observe(element));
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { stopHero(); cancelEffects(); }
  });
  document.addEventListener('freeze', () => { stopHero(); cancelEffects(); });
  window.addEventListener('pagehide', () => { stopHero(); cancelEffects(); });
})();
