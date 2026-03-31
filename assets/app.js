
const menuToggle = document.querySelector('.menu-toggle');
const navControls = document.querySelector('.nav-controls');
if (menuToggle && navControls){
  menuToggle.addEventListener('click', () => {
    const open = navControls.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.drop-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth > 760) return;
    e.preventDefault();
    const parent = btn.closest('.dropdown');
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== parent) d.classList.remove('open');
    });
    parent.classList.toggle('open');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', () => {
    if (window.innerWidth <= 760 && navControls) navControls.classList.remove('open');
  });
});
