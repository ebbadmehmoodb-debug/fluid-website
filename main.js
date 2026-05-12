/* ============================================================
   FLUID — Main JS (nav, accordion, carousel, scroll reveal)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navInner = document.querySelector('.nav-inner');

  function positionMenu() {
    if (navInner && mobileMenu) {
      const rect = navInner.getBoundingClientRect();
      mobileMenu.style.top = (rect.bottom + 8) + 'px';
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      positionMenu();
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ---- Pricing Toggle ----
  const toggleBtns = document.querySelectorAll('.pricing-toggle button');
  const grids = document.querySelectorAll('.pricing-pane');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      grids.forEach(g => {
        g.style.display = g.dataset.pane === target ? 'grid' : 'none';
      });
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Case Study Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseBlocks = document.querySelectorAll('.case-block[data-industry]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      caseBlocks.forEach(block => {
        if (filter === 'all' || block.dataset.industry === filter) {
          block.style.display = 'grid';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });

  // ---- Testimonials Carousel ----
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (track && slides.length) {
    let current = 0;

    const dots = [];
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      if (dotsContainer) dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance
    setInterval(() => goTo(current + 1), 6000);
  }

  // ---- Nav scroll opacity ----
  const navInnerEl = document.querySelector('.nav-inner');
  if (navInnerEl) {
    window.addEventListener('scroll', () => {
      navInnerEl.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ---- Marquee pause on hover ----
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.querySelectorAll('.marquee-frame').forEach(frame => {
      frame.addEventListener('mouseenter', () => marqueeTrack.classList.add('paused'));
      frame.addEventListener('mouseleave', () => marqueeTrack.classList.remove('paused'));
    });
  }

  // ---- Blog category filter ----
  const catBtns = document.querySelectorAll('.blog-cat-filter');
  const blogCards = document.querySelectorAll('.blog-card[data-cat]');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      blogCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'flex' : 'none';
      });
    });
  });

});
