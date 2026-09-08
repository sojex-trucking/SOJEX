const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

const updatePrimaryButtonLabels = () => {
  document.querySelectorAll('.process-intro .button').forEach((link) => {
    const label = [...link.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (label) label.nodeValue = 'START YOUR 14-DAY FREE TRIAL ';
  });

  const submitButton = document.querySelector('#trial-form button[type="submit"]');
  if (submitButton) {
    const submitLabel = [...submitButton.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (submitLabel) submitLabel.nodeValue = 'START YOUR 14-DAY FREE TRIAL ';
  }
};

updatePrimaryButtonLabels();

const form = document.querySelector('#trial-form');
if (form) {
  form.removeAttribute('novalidate');
  form.setAttribute('action', 'https://formspree.io/f/xdeowwja');
  form.setAttribute('method', 'POST');
  form.querySelectorAll('[name]').forEach((field) => {
    field.setAttribute('data-fs-field', '');
    const error = field.closest('label')?.querySelector('.error');
    if (error) error.setAttribute('data-fs-error', field.getAttribute('name'));
  });

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.setAttribute('data-fs-submit-btn', '');

  const successMessage = form.querySelector('.form-success');
  if (successMessage) successMessage.setAttribute('data-fs-success', '');

  const formError = document.createElement('div');
  formError.setAttribute('data-fs-error', '');
  formError.setAttribute('role', 'alert');
  form.insertBefore(formError, successMessage);
}

if (menuToggle && nav) {
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
}

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details[open]').forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    }
  });
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
