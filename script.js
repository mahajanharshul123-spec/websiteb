/**
 * Harshul Mahajan Portfolio — Interactive Script
 * Handles navbar, scroll animations, video player, PDF modal, and mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== Active Nav Link Highlighting =====
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  };
  if (navLinks.length) window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ===== Mobile Menu Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksEl.classList.toggle('active');
    });
    // Close menu on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksEl.classList.remove('active');
      });
    });
  }

  // ===== Scroll Animations (Intersection Observer) =====
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animatedEls.forEach((el, i) => {
      el.style.transitionDelay = `${i % 4 * 0.1}s`;
      observer.observe(el);
    });
  }

  // ===== Video Player =====
  const video = document.getElementById('introVideo');
  const overlay = document.getElementById('videoOverlay');
  const playBtn = document.getElementById('playBtn');
  if (video && overlay && playBtn) {
    const togglePlay = () => {
      if (video.paused) {
        video.play();
        overlay.classList.add('hidden');
      } else {
        video.pause();
        overlay.classList.remove('hidden');
      }
    };
    playBtn.addEventListener('click', togglePlay);
    overlay.addEventListener('click', togglePlay);
    video.addEventListener('ended', () => overlay.classList.remove('hidden'));
    video.addEventListener('pause', () => overlay.classList.remove('hidden'));
    video.addEventListener('play', () => overlay.classList.add('hidden'));
  }

  // ===== PDF Fullscreen Modal =====
  const modal = document.getElementById('pdfModal');
  const modalViewer = document.getElementById('modalPdfViewer');
  const modalClose = document.getElementById('modalClose');

  const openModal = (pdfSrc) => {
    if (!modal || !modalViewer) return;
    modalViewer.src = pdfSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal || !modalViewer) return;
    modal.classList.remove('active');
    modalViewer.src = '';
    document.body.style.overflow = '';
  };

  // Portfolio fullscreen button
  const portfolioFs = document.getElementById('portfolioFullscreen');
  if (portfolioFs) {
    portfolioFs.addEventListener('click', () => openModal('Harshul Mahajan Portfolio.pdf'));
  }

  // Manifesto fullscreen button
  const manifestoFs = document.getElementById('manifestoFullscreen');
  if (manifestoFs) {
    manifestoFs.addEventListener('click', () => openModal('Manifesto Assignment.pdf'));
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
