// Mobile Menu Toggle & Navigation
const menuToggle = document.getElementById('menuToggle') || document.querySelector('[data-menu-toggle], .menu-toggle');
const mainNav = document.getElementById('mainNav') || document.getElementById('primary-navigation') || document.querySelector('[data-navigation], .primary-navigation');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link, .primary-navigation a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mainNav.classList.contains('active') &&
      !mainNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Sticky Header blur/shadow on scroll
const header = document.querySelector('[data-site-header], .site-header');
if (header) {
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Update copyright year if element exists
const yearElement = document.querySelector('[data-current-year]');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Scroll animation with IntersectionObserver
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll(
  '.service, .credential, .founder-facts > div, .course-list li, .hero-content, .contact-copy, .section-heading, .founder-portrait, .academy-proof, .contact-image, .service-note'
);

animatedElements.forEach(el => {
  el.classList.add('reveal-init');
  observer.observe(el);
});
