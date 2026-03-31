
const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.nav-links');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('[data-count]').forEach(el => {
  const end = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(end / 40));
  const timer = setInterval(() => {
    current += step;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    el.textContent = end >= 1000 ? current.toLocaleString('en-GB') : current;
  }, 35);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});


if (window.matchMedia('(max-width: 760px)').matches) {
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
      const parent = link.parentElement;
      if (!parent.classList.contains('open')) {
        e.preventDefault();
        document.querySelectorAll('.has-dropdown.open').forEach(el => {
          if (el !== parent) el.classList.remove('open');
        });
        parent.classList.add('open');
      }
    });
  });
}
