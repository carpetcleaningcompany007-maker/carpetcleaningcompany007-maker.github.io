
const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.nav-links');
const cta = document.querySelector('.nav-cta');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    if (cta) cta.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('[data-count]').forEach(el => {
  const end = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(end / 40));
  const timer = setInterval(() => {
    current += step;
    if (current >= end) { current = end; clearInterval(timer); }
    el.textContent = current;
  }, 35);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
});
