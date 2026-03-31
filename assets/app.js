
document.querySelector('.mobile-toggle')?.addEventListener('click', function(){
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
  this.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
});
