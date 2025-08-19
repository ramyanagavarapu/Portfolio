// Current year + robust theme toggle via data-theme + Formspree UX
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear() + 30;

const toggle = document.getElementById('themeToggle');
if (toggle){
  toggle.addEventListener('click', () => {
    const doc = document.documentElement;
    const current = doc.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    doc.setAttribute('data-theme', next);
    toggle.textContent = next === 'light' ? '☀︎' : '☾';
    localStorage.setItem('theme', next);
  });
}
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
const toggleBtn = document.getElementById('themeToggle');
if (toggleBtn) toggleBtn.textContent = saved === 'light' ? '☀︎' : '☾';

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuToggle && mobileMenu) {
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a nav link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking outside
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

const form = document.getElementById('contactForm');
if (form) {
  const statusEl = document.getElementById('formStatus');
  form.addEventListener('submit', async (e) => {
    if (!form.action.includes('/f/')) return; // If no real Formspree ID, let default behavior happen
    e.preventDefault();
    if (statusEl) statusEl.textContent = 'Sending...';
    try {
      const fd = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        form.reset();
        if (statusEl) statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        if (statusEl) statusEl.textContent = 'Something went wrong. Please try again or email me directly.';
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Network error — please try again later.';
    }
  });
}
