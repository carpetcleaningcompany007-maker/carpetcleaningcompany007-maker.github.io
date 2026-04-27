(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mobile-toggle').forEach(btn => {
      const header = btn.closest('header') || document.querySelector('header') || document;
      const menu = header.querySelector('nav.nav-links, .nav-links') || document.querySelector('nav.nav-links, .nav-links');
      if (!menu || btn.dataset.mobileReady === '1') return;
      btn.dataset.mobileReady = '1';
      btn.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        const open = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', open);
        menu.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('mobile-nav-open', open);
      });
    });
  });
})();
