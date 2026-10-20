/* Buildless progressive enhancement: static content remains the source of truth. */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 850px)');
  const phone = matchMedia('(max-width: 560px)');
  const hero = document.querySelector('.hero-art');
  const update = document.querySelector('.update-proof');
  const replay = document.querySelector('.replay');
  const controls = document.querySelector('.update-controls');
  const stateButtons = [...document.querySelectorAll('[data-state]')];
  const effects = new Map();
  const visible = new Set();
  let heroPlayed = false;
  let selection = 'stage';

  function stop(group) {
    for (const [animation, owner] of effects) {
      if (!group || owner === group) {
        animation.cancel();
        effects.delete(animation);
      }
    }
    if (!group || group === hero) replay?.setAttribute('data-playing', 'false');
  }

  function animate(element, frames, options, owner) {
    if (!element?.animate || reduced.matches || document.hidden || !visible.has(owner)) return;
    const animation = element.animate(frames, options);
    effects.set(animation, owner);
    const finish = () => {
      effects.delete(animation);
      animation.cancel();
      if (owner === hero && ![...effects.values()].includes(hero)) replay?.setAttribute('data-playing', 'false');
    };
    animation.finished.then(finish, finish);
  }

  function traceFrames(path, start = 0, end = 1) {
    const length = path.getTotalLength();
    return Array.from({ length: 33 }, (_, i) => {
      const ratio = i / 32;
      const point = path.getPointAtLength(length * ratio);
      return { transform: `translate(${point.x}px, ${point.y}px)`, opacity: i === 0 || i === 32 ? 0 : 1, offset: start + ratio * (end - start) };
    });
  }

  function playHero() {
    // Replaying replaces the previous run rather than stacking work.
    stop(hero);
    if (!hero || reduced.matches || document.hidden || !visible.has(hero)) return;
    heroPlayed = true;
    const svg = hero.querySelector(compact.matches ? '.network-compact' : '.network-wide');
    const paths = [...svg.querySelectorAll('[data-packet-path]')];
    const exit = svg.querySelector('.exit-line');
    const markers = [...svg.querySelectorAll('.network-packets circle')];
    replay.setAttribute('data-playing', 'true');
    paths.forEach((path, index) => {
      const frames = [...traceFrames(path, 0, .65), ...traceFrames(exit, .74, 1)];
      animate(markers[index], frames, { duration: compact.matches ? 1450 : 2050, delay: index * 220, easing: 'linear' }, hero);
    });
  }

  function positionSlotRoutes() {
    if (!update) return;
    const svg = update.querySelector('.slot-route');
    const stage = svg.querySelector('.stage-route');
    const fallback = svg.querySelector('.fallback-route');
    if (phone.matches) {
      const accepted = update.querySelector('.accepted');
      const candidate = update.querySelector('.candidate');
      const height = Math.max(1, svg.clientHeight);
      const a = accepted.offsetTop + accepted.offsetHeight / 2;
      const b = candidate.offsetTop + candidate.offsetHeight / 2;
      svg.setAttribute('viewBox', `0 0 12 ${height}`);
      stage.setAttribute('d', `M6 0V${b - 6}Q6 ${b} 12 ${b}`);
      fallback.setAttribute('d', `M12 ${b}Q3 ${b} 3 ${b - 9}V${a + 9}Q3 ${a} 12 ${a}`);
    } else {
      svg.setAttribute('viewBox', '0 0 480 42');
      stage.setAttribute('d', 'M460 0V12Q460 24 448 24H372Q360 24 360 36V42');
      fallback.setAttribute('d', 'M360 0V12Q360 24 348 24H132Q120 24 120 36V42');
    }
  }

  function selectState(name, movement = false) {
    if (!update || !['stage', 'fallback'].includes(name)) return;
    stop(update);
    selection = name;
    update.dataset.mode = name;
    for (const button of stateButtons) button.setAttribute('aria-pressed', String(button.dataset.state === name));
    const stage = name === 'stage';
    update.querySelector('.route-source').textContent = stage ? 'Signed image' : 'Failed boot checks';
    update.querySelector('.candidate-state').textContent = stage ? 'Staged' : 'Failed checks';
    update.querySelector('.candidate-detail').textContent = stage ? 'Inactive slot' : 'Not accepted';
    const result = update.querySelector('.update-result');
    const strong = document.createElement('strong');
    strong.textContent = stage ? 'Candidate staged. Accepted image retained.' : 'Boot fallback returns to the accepted image.';
    result.replaceChildren(strong, document.createTextNode(stage ? ' Fresh boot checks come before acceptance.' : ' The failed candidate does not become the default.'));
    positionSlotRoutes();
    if (movement) {
      const path = update.querySelector(stage ? '.stage-route' : '.fallback-route');
      animate(update.querySelector('.slot-packet'), traceFrames(path), { duration: phone.matches ? 420 : 600, easing: 'linear' }, update);
    }
  }

  if (update && controls && stateButtons.length === 2) {
    for (const button of stateButtons) {
      button.addEventListener('click', event => {
        if (button.dataset.state !== selection) selectState(button.dataset.state, event.detail > 0);
      });
    }
    controls.hidden = false;
    update.classList.add('enhanced');
    positionSlotRoutes();
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= .15) {
        visible.add(entry.target);
        if (entry.target === hero && !heroPlayed) playHero();
      } else {
        visible.delete(entry.target);
        stop(entry.target);
      }
    }
  }, { threshold: [0, .15] }) : null;

  function observe() {
    if (observer) for (const element of [hero, update]) if (element) observer.observe(element);
  }
  observe();
  if (replay) {
    replay.hidden = reduced.matches || !observer;
    replay.addEventListener('click', event => { if (event.detail > 0) playHero(); });
    // Replay is an explicit request to see the explanatory motion, including by keyboard.
    replay.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        playHero();
      }
    });
  }

  reduced.addEventListener('change', () => {
    heroPlayed = true;
    stop();
    if (replay) replay.hidden = reduced.matches || !observer;
  });
  const resizeObserver = 'ResizeObserver' in window && update ? new ResizeObserver(() => {
    stop(update);
    positionSlotRoutes();
  }) : null;
  if (resizeObserver) resizeObserver.observe(update.querySelector('.slot-diagram'));
  window.addEventListener('resize', () => { stop(); positionSlotRoutes(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  document.addEventListener('freeze', () => stop());
  window.addEventListener('pagehide', () => {
    stop();
    visible.clear();
    observer?.disconnect();
    resizeObserver?.disconnect();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    positionSlotRoutes();
    observe();
    if (resizeObserver && update) resizeObserver.observe(update.querySelector('.slot-diagram'));
  });
})();
