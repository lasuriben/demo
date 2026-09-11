const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => menuToggle?.setAttribute('aria-expanded', 'false'));
});

document.querySelectorAll('.comparison-slider').forEach((slider) => {
  const range = slider.querySelector('.comparison-range');
  const updateComparison = () => slider.style.setProperty('--position', `${range.value}%`);

  range.addEventListener('input', updateComparison);
  updateComparison();
});

const viewServices = document.querySelector('.view-services');
const servicesGrid = document.querySelector('.services-grid');

viewServices?.addEventListener('click', () => {
  const isExpanded = viewServices.getAttribute('aria-expanded') === 'true';
  viewServices.setAttribute('aria-expanded', String(!isExpanded));
  viewServices.textContent = isExpanded ? 'View All Services' : 'Show Fewer Services';
  servicesGrid?.classList.toggle('show-all', !isExpanded);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const bookingModal = document.querySelector('.booking-modal');
const bookingForm = document.querySelector('.booking-form');
const bookingSuccess = document.querySelector('.booking-success');
const bookingDate = document.querySelector('#booking-date');
const bookingTriggers = document.querySelectorAll('a[href="#appointment"]');

bookingDate.min = new Date().toISOString().split('T')[0];

function closeBookingModal() {
  bookingModal?.classList.remove('open');
  bookingModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openBookingModal() {
  bookingModal?.classList.add('open');
  bookingModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  bookingSuccess.hidden = true;
  setTimeout(() => document.querySelector('#booking-name')?.focus(), 150);
}

bookingTriggers.forEach((trigger) => trigger.addEventListener('click', (event) => {
  event.preventDefault();
  openBookingModal();
}));

document.querySelectorAll('[data-close-booking]').forEach((element) => element.addEventListener('click', closeBookingModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bookingModal?.classList.contains('open')) closeBookingModal();
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingSuccess.hidden = false;
  bookingForm.reset();
  bookingDate.min = new Date().toISOString().split('T')[0];
});
