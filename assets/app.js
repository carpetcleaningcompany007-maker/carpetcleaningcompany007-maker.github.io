(() => {
  function findMenu(btn){
    const header = btn.closest('header') || document.querySelector('header') || document;
    return header.querySelector('nav.nav-links, .nav-links') || document.querySelector('nav.nav-links, .nav-links');
  }
  function openMenu(btn, menu, open){
    menu.classList.toggle('mobile-open', open);
    menu.classList.toggle('is-open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('mobile-nav-open', open);
  }
  document.addEventListener('click', event => {
    const btn = event.target.closest && event.target.closest('.mobile-toggle');
    if (!btn) return;
    event.preventDefault();
    event.stopPropagation();
    const menu = findMenu(btn);
    if (!menu) return;
    openMenu(btn, menu, !menu.classList.contains('mobile-open'));
  }, true);
})();
