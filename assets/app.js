(() => {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  const closeAllSubmenus = () => {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      item.classList.remove('open');
      const btn = item.querySelector('.submenu-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      if (header) header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeAllSubmenus();
    });

    document.addEventListener('click', (event) => {
      if (!header) return;
      if (!header.contains(event.target)) {
        menu.classList.remove('is-open');
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        closeAllSubmenus();
      }
    });
  }

  document.querySelectorAll('.nav-item').forEach((item, index) => {
    const link = item.querySelector(':scope > a');
    const dropdown = item.querySelector(':scope > .dropdown');
    if (!link || !dropdown) return;

    const submenuId = dropdown.id || `submenu-${index + 1}`;
    dropdown.id = submenuId;

    let btn = item.querySelector(':scope > .submenu-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'submenu-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', submenuId);
      btn.setAttribute('aria-label', `Toggle ${link.textContent.trim()} menu`);
      btn.innerHTML = '<span aria-hidden="true">▾</span>';
      link.insertAdjacentElement('afterend', btn);
    }

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const willOpen = !item.classList.contains('open');
      if (window.innerWidth <= 760) {
        document.querySelectorAll('.nav-item.open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const openBtn = openItem.querySelector('.submenu-toggle');
            if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }
      item.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (menu) menu.classList.remove('is-open');
      if (header) header.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      closeAllSubmenus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      if (menu) menu.classList.remove('is-open');
      if (header) header.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      closeAllSubmenus();
    }
  });

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
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.faq-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });
})();

setInterval(()=>{
  const msgs=document.querySelectorAll('.promo-float-message');
  if(!msgs.length) return;
  let active=[...msgs].findIndex(m=>m.classList.contains('is-active'));
  msgs[active].classList.remove('is-active');
  msgs[(active+1)%msgs.length].classList.add('is-active');
},3000);

document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('promo-float-close')){
    document.getElementById('promoFloat').style.display='none';
  }
});



(() => {
  const card = document.getElementById('offerCardFloat');
  if (!card) return;

  const slides = Array.from(card.querySelectorAll('.offer-card-slide'));
  const closeBtn = card.querySelector('.offer-card-close');
  let idx = 0;

  const showSlide = (n) => {
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === n));
  };

  if (slides.length > 1) {
    setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 3800);
  }

  closeBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    card.style.display = 'none';
    try { localStorage.setItem('offerCardClosed', '1'); } catch(e) {}
  });

  try {
    if (localStorage.getItem('offerCardClosed') === '1') {
      card.style.display = 'none';
    }
  } catch(e) {}
})();
