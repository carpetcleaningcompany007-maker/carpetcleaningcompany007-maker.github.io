
document.querySelector('.mobile-toggle')?.addEventListener('click', function(){
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('open');
  this.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
});
document.querySelectorAll('.dropbtn').forEach(btn=>{
  btn.addEventListener('click', function(e){
    if(window.innerWidth <= 1080){
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});
