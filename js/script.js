/* =========================================================
   CESHFPT — Interactions
   ========================================================= */
(() => {
  'use strict';

  // Destinataires des demandes du formulaire
  const WHATSAPP_NUMBER = '221778741031'; // format international, sans « + »
  const CONTACT_EMAIL = 'centreenergiesolairetamba@gmail.com';

  // Mots qui défilent dans le titre principal (une classe « is-sky » colore en bleu ciel)
  const ROTATOR_WORDS = [
    'l’énergie solaire',
    'l’informatique',
    'la comptabilité',
    'l’infographie',
    'la logistique',
    'le marketing',
  ];

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Année du pied de page ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- En-tête, progression de lecture, retour en haut, parallaxe ---------- */
  const header = $('.site-header');
  const backToTop = $('.back-to-top');
  const progress = $('.scroll-progress');
  const quoteBand = $('.quote-band');
  const quoteBg = $('.quote-bg');
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 10);
    backToTop.classList.toggle('is-visible', y > 700);
    progress.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);

    if (quoteBg && !reducedMotion) {
      const rect = quoteBand.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const ratio = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        quoteBg.style.transform = `translateY(${(ratio * -10).toFixed(2)}%)`;
      }
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  window.addEventListener('load', onScroll); // arrivée directe sur une ancre (#contact…)
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Menu mobile ---------- */
  const nav = $('#main-nav');
  const navToggle = $('.nav-toggle');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-open', open);
  };

  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('a', nav).forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      navToggle.focus();
    }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Lien actif selon la section visible ---------- */
  const navLinks = $$('.nav-link');
  const spied = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spied.forEach((section) => spy.observe(section));

  /* ---------- Mots qui défilent dans le titre ---------- */
  const rotatorWord = $('.rotator-word');
  if (rotatorWord && !reducedMotion) {
    let index = 0;
    setInterval(() => {
      rotatorWord.classList.remove('is-in');
      rotatorWord.classList.add('is-out');
      setTimeout(() => {
        index = (index + 1) % ROTATOR_WORDS.length;
        rotatorWord.textContent = ROTATOR_WORDS[index];
        rotatorWord.classList.toggle('is-sky', index % 2 === 1);
        rotatorWord.classList.remove('is-out');
        rotatorWord.classList.add('is-in');
      }, 350);
    }, 3000);
  }

  /* ---------- Apparition au défilement (avec décalage dans les grilles) ---------- */
  $$('.formation-card').forEach((card) => card.classList.add('reveal'));
  $$('.stats-grid, .formations-grid, .poles-grid, .mv-grid, .steps, .bento, .values, .timeline').forEach((grid) => {
    [...grid.children].forEach((child, i) => child.style.setProperty('--d', `${Math.min(i, 6) * 90}ms`));
  });

  const revealEls = $$('.reveal');
  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealer.observe(el));
  }

  /* ---------- Compteurs animés ---------- */
  const counters = $$('[data-count]');

  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const from = Number(el.dataset.from || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (target - from) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!reducedMotion) {
    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => {
      el.textContent = (el.dataset.from || 0) + (el.dataset.suffix || '');
      counterObs.observe(el);
    });
  }

  /* ---------- Effet « projecteur » qui suit la souris sur les cartes ---------- */
  if (finePointer && !reducedMotion) {
    $$('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Filtre des formations ---------- */
  const filterBtns = $$('[data-filter]');
  const formationCards = $$('.formation-card');
  const formationCount = $('#formation-count');

  const applyFilter = (category) => {
    filterBtns.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.filter === category)));
    let visible = 0;
    formationCards.forEach((card) => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.classList.add('is-visible');
      }
    });
    formationCount.textContent = visible;
  };

  filterBtns.forEach((btn) => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  // Liens « Voir les formations » des pôles et du pied de page
  $$('[data-filter-link]').forEach((link) => {
    link.addEventListener('click', () => applyFilter(link.dataset.filterLink));
  });

  /* ---------- Liste « Objet de la demande » générée depuis le catalogue ---------- */
  const objetSelect = $('#objet');
  const servicesGroup = $('#services-group');
  const categoryLabels = {
    solaire: 'Formations — Énergie',
    numerique: 'Formations — Informatique & numérique',
    gestion: 'Formations — Gestion & commerce',
  };

  Object.entries(categoryLabels).forEach(([category, label]) => {
    const cards = formationCards.filter((card) => card.dataset.category === category);
    if (!cards.length) return;
    const group = document.createElement('optgroup');
    group.label = label;
    cards.forEach((card) => {
      const title = $('h3', card).textContent.trim();
      group.appendChild(new Option(title, title));
    });
    objetSelect.insertBefore(group, servicesGroup);
  });

  const nameInput = $('#nom');
  const messageInput = $('#message');

  const prefillRequest = (objet, message) => {
    objetSelect.value = objet;
    objetSelect.dispatchEvent(new Event('change'));
    if (message) messageInput.value = message;
    objetSelect.classList.remove('flash');
    void objetSelect.offsetWidth; // relance l'animation
    objetSelect.classList.add('flash');
    nameInput.focus({ preventScroll: true });
  };

  // Boutons « S'inscrire » des cartes de formation
  $$('.js-enroll').forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = $('h3', btn.closest('.formation-card')).textContent.trim();
      prefillRequest(title);
    });
  });

  /* ---------- Estimateur solaire ---------- */
  const estimator = $('#estimator');
  const PANEL_WC = 400;           // puissance d'un panneau (Wc)
  const SYSTEM_EFFICIENCY = 0.75; // pertes câbles, onduleur, température, poussière
  const BATTERY_DOD = 0.8;        // profondeur de décharge utile (lithium)

  const fmt = (value, digits = 1) =>
    value.toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const estimate = () => {
    const { conso, ensoleillement, autonomie } = estimator.elements;
    const monthly = Number(conso.value) || 0;
    const sunHours = Math.max(Number(ensoleillement.value) || 0, 1);
    const days = Math.max(Number(autonomie.value) || 0, 0);

    const daily = monthly / 30;
    const kwc = daily / (sunHours * SYSTEM_EFFICIENCY);
    const panels = Math.max(1, Math.ceil((kwc * 1000) / PANEL_WC));
    const battery = (daily * days) / BATTERY_DOD;

    $('#conso-out').textContent = `${monthly} kWh`;
    const fill = ((monthly - conso.min) / (conso.max - conso.min)) * 100;
    conso.style.setProperty('--fill', `${fill}%`);

    $('#res-kwc').textContent = `${fmt(kwc)} kWc`;
    $('#res-panels').textContent = panels;
    $('#res-battery').textContent = days > 0 ? `${fmt(battery)} kWh` : 'Aucune';

    return { monthly, kwc, panels, battery, days };
  };

  estimator.addEventListener('input', estimate);
  estimator.addEventListener('submit', (e) => e.preventDefault());
  estimate();

  $('.js-estimate-cta').addEventListener('click', () => {
    const r = estimate();
    const summary = `Bonjour, je souhaite une étude solaire. Mon estimation : ${r.monthly} kWh/mois, `
      + `environ ${fmt(r.kwc)} kWc (${r.panels} panneaux de ${PANEL_WC} Wc)`
      + (r.days > 0 ? ` et ${fmt(r.battery)} kWh de batterie.` : ', sans batterie.');
    prefillRequest('Étude ou installation solaire', summary);
  });

  /* ---------- FAQ ---------- */
  $$('.faq-q').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const willOpen = !item.classList.contains('is-open');

      // Une seule réponse ouverte à la fois
      $$('.faq-item.is-open').forEach((openItem) => {
        openItem.classList.remove('is-open');
        $('.faq-q', openItem).setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('is-open', willOpen);
      question.setAttribute('aria-expanded', String(willOpen));
    });
  });

  /* ---------- Galerie : filtres ---------- */
  const galleryBtns = $$('[data-gfilter]');
  const galleryItems = $$('.gallery-item');

  const applyGalleryFilter = (category) => {
    galleryBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.gfilter === category)));
    galleryItems.forEach((item) => {
      item.hidden = !(category === 'all' || item.dataset.gcat === category);
    });
  };

  galleryBtns.forEach((btn) => btn.addEventListener('click', () => applyGalleryFilter(btn.dataset.gfilter)));
  // Lien « Voir nos actions » du pôle hygiène
  $$('[data-gallery-link]').forEach((link) => {
    link.addEventListener('click', () => applyGalleryFilter(link.dataset.galleryLink));
  });

  /* ---------- Galerie : visionneuse ---------- */
  const lightbox = $('#lightbox');
  const lbImg = $('img', lightbox);
  const lbCaption = $('.lb-caption', lightbox);
  const lbCount = $('.lb-count', lightbox);
  let lbItems = [];
  let lbIndex = 0;
  let lbOpener = null;

  const showPhoto = (index) => {
    lbIndex = (index + lbItems.length) % lbItems.length;
    const btn = $('.gallery-btn', lbItems[lbIndex]);
    const thumb = $('img', btn);
    lbImg.src = btn.dataset.full;
    lbImg.alt = thumb.alt;
    lbCaption.textContent = $('.gallery-cap', btn).textContent;
    lbCount.textContent = `${lbIndex + 1} / ${lbItems.length}`;
    // relance l'animation d'apparition
    lbImg.style.animation = 'none';
    void lbImg.offsetWidth;
    lbImg.style.animation = '';
  };

  galleryItems.forEach((item) => {
    $('.gallery-btn', item).addEventListener('click', (e) => {
      lbItems = galleryItems.filter((el) => !el.hidden);
      lbOpener = e.currentTarget;
      showPhoto(lbItems.indexOf(item));
      lightbox.showModal();
    });
  });

  $('.lb-prev', lightbox).addEventListener('click', () => showPhoto(lbIndex - 1));
  $('.lb-next', lightbox).addEventListener('click', () => showPhoto(lbIndex + 1));
  $('.lb-close', lightbox).addEventListener('click', () => lightbox.close());

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
  });
  // Clic sur le fond sombre : fermeture
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    if (lbOpener) lbOpener.focus();
  });

  // Balayage tactile
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  });

  /* ---------- Formulaire de demande ---------- */
  const form = $('#contact-form');
  const formStatus = $('#form-status');

  const rules = {
    nom: (el) => el.value.trim().length >= 2 || 'Veuillez indiquer votre nom complet.',
    telephone: (el) => /^[+()\d\s.-]{8,20}$/.test(el.value.trim()) || 'Veuillez indiquer un numéro de téléphone valide.',
    email: (el) => !el.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) || 'Adresse e-mail invalide.',
    objet: (el) => el.value !== '' || 'Veuillez choisir l’objet de votre demande.',
    consentement: (el) => el.checked || 'Merci d’accepter d’être recontacté(e).',
  };

  const validateField = (name) => {
    const el = form.elements[name];
    const result = rules[name](el);
    const message = result === true ? '' : result;
    el.setAttribute('aria-invalid', message ? 'true' : 'false');
    $(`#${name}-error`).textContent = message;
    return !message;
  };

  Object.keys(rules).forEach((name) => {
    const el = form.elements[name];
    const commitEvent = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'blur';
    el.addEventListener(commitEvent, () => validateField(name));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.className = 'form-status';

    const invalid = Object.keys(rules).filter((name) => !validateField(name));
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      formStatus.classList.add('is-error');
      formStatus.textContent = 'Merci de corriger les champs indiqués.';
      return;
    }

    const data = new FormData(form);
    const lines = [
      'Bonjour CESHFPT, voici ma demande :',
      '',
      `• Nom : ${data.get('nom').trim()}`,
      `• Téléphone : ${data.get('telephone').trim()}`,
      `• E-mail : ${data.get('email').trim() || 'non renseigné'}`,
      `• Objet : ${data.get('objet')}`,
    ];
    const message = data.get('message').trim();
    if (message) lines.push('', message);
    const body = lines.join('\n');

    const channel = e.submitter && e.submitter.value === 'email' ? 'email' : 'whatsapp';
    if (channel === 'email') {
      const subject = `Demande CESHFPT — ${data.get('objet')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      formStatus.textContent = 'Votre messagerie s’ouvre avec votre demande pré-remplie : il ne vous reste qu’à l’envoyer. Merci !';
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
      formStatus.textContent = 'WhatsApp s’ouvre avec votre demande pré-remplie : il ne vous reste qu’à l’envoyer. Merci !';
    }
    formStatus.classList.add('is-success');
  });
})();
