const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

document.querySelectorAll('.process-intro .button, .contact-details .button').forEach((link) => {
  const label = [...link.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (label) label.nodeValue = 'Start Your Free Trial ';
});

const submitButton = document.querySelector('#trial-form button[type="submit"]');
const submitLabel = [...submitButton.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
if (submitLabel) submitLabel.nodeValue = 'Start Your Free Trial ';

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details[open]').forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    }
  });
});

const form = document.querySelector('#trial-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll('[required]')];
  let isValid = true;

  requiredFields.forEach((field) => {
    const valid = field.checkValidity();
    field.closest('label').classList.toggle('has-error', !valid);
    if (!valid) isValid = false;
  });

  if (!isValid) {
    form.querySelector('.has-error input, .has-error select').focus();
    return;
  }

  form.querySelector('.form-success').classList.add('is-visible');
  form.querySelector('.form-success').focus();
  form.querySelector('button[type="submit"]').disabled = true;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .benefit-grid article, .step, .audience-list > div, .about-copy, .faq-list details').forEach((element) => {
  element.classList.add('reveal-on-scroll');
  revealObserver.observe(element);
});
