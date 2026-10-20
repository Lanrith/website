/* The site's only script. Run before CSS to avoid a wrong-theme first paint. */
(() => {
  'use strict';

  const storageKey = 'lanrith-theme';
  const root = document.documentElement;
  let theme = 'dark';

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {
    // Reading remains available when storage is disabled or inaccessible.
  }
  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.theme-switch');
    if (!control) return;

    control.setAttribute('aria-checked', String(theme === 'dark'));
    control.hidden = false;
    control.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = theme;
      control.setAttribute('aria-checked', String(theme === 'dark'));
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {
        // The switch still works for this page when preference saving is blocked.
      }
    });
  }, { once: true });
})();
