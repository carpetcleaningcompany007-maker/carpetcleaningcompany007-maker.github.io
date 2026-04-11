(() => {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');


  const insertPromoBar = () => {
    if (document.querySelector('.promo-marquee')) return;
    const header = document.querySelector('.site-header');
    if (!header) return;
    const items = [
      '5 Star rated local service',
      'Deep Clean from only £45 per additional room',
      'Free hall and landing when stairs are cleaned',
      'Fast WhatsApp quotes',
      'Fully insured professional cleaning'
    ];
    const marquee = document.createElement('div');
    marquee.className = 'promo-marquee';
    const repeatedItems = items.concat(items).map(text => `<span class="promo-marquee-item"><span class="promo-marquee-dot" aria-hidden="true"></span><span>${text}</span></span>`).join('');
    marquee.innerHTML = `
      <div class="container promo-marquee-inner">
        <div class="promo-marquee-label">Now booking</div>
        <div class="promo-marquee-viewport" aria-label="Current offers and service highlights">
          <div class="promo-marquee-track">${repeatedItems}</div>
        </div>
      </div>`;
    header.insertAdjacentElement('afterend', marquee);
  };
  insertPromoBar();


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
