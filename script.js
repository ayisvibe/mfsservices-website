// Basic interactivity: nav toggle, animated reveal, carousel, contact form handling, modal
document.addEventListener('DOMContentLoaded', () => {
  // Set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navigation toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Animated reveal for why-cards using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    }
  }, {threshold: 0.18});

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Simple accessible carousel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;
  const items = track ? Array.from(track.children) : [];
  const total = items.length;

  function showIndex(i) {
    if (!track) return;
    index = (i + total) % total;
    const width = track.clientWidth; // container width
    track.style.transform = `translateX(-${index * width}px)`;
    // update aria attributes if needed
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showIndex(index - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showIndex(index + 1));

  // Handle resize to keep slide widths correct
  window.addEventListener('resize', () => showIndex(index));

  // Auto-advance carousel every 6s
  let auto = setInterval(() => showIndex(index + 1), 6000);
  [prevBtn, nextBtn, track].forEach(el => {
    if (el) el.addEventListener('mouseenter', () => clearInterval(auto));
    if (el) el.addEventListener('mouseleave', () => auto = setInterval(() => showIndex(index + 1), 6000));
  });

  // Contact form handling (client-side): validate and show success message.
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(form);
      // Basic validation (HTML5 handles required fields)
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      if (!name || !email || !message) {
        status.textContent = 'Please complete the required fields.';
        return;
      }

      // Since there's no backend, we compose a mailto as fallback and show success UI.
      const subject = encodeURIComponent('MFS Services enquiry from website');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${data.get('phone') || 'N/A'}\n\nMessage:\n${message}`);
      const mailto = `mailto:clientservices@mfsservicesng.com?subject=${subject}&body=${body}`;

      status.textContent = 'Preparing your message...';
      // Open user's email client as graceful degradation:
      setTimeout(() => {
        window.location.href = mailto;
        status.textContent = 'If your mail client did not open, please email clientservices@mfsservicesng.com or try again.';
        form.reset();
      }, 600);
    });
  }

  // WhatsApp modal
  const waBtn = document.getElementById('whatsappBtn');
  const waModal = document.getElementById('waModal');
  const modalClose = document.querySelector('.modal-close');
  const openWa = document.getElementById('openWa');
  const copyWa = document.getElementById('copyWa');

  function showModal() {
    waModal.setAttribute('aria-hidden', 'false');
    waModal.style.display = 'flex';
    // trap focus ideally (simple)
    modalClose.focus();
  }
  function hideModal() {
    waModal.setAttribute('aria-hidden', 'true');
    waModal.style.display = 'none';
    waBtn.focus();
  }

  if (waBtn) waBtn.addEventListener('click', showModal);
  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (waModal) waModal.addEventListener('click', (e) => { if (e.target === waModal) hideModal(); });
  if (copyWa) copyWa.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('+2348123456789');
      copyWa.textContent = 'Copied!';
      setTimeout(() => copyWa.textContent = 'Copy Number', 1500);
    } catch {
      copyWa.textContent = 'Copy failed';
    }
  });

  // Smooth focus-visible outlines for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
  }, {once:true});

  // Performance: lazy load images (if any) and reduce reflows
});
