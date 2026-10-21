document.getElementById('year').textContent = new Date().getFullYear();
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches && 'IntersectionObserver' in window) {
 const targets = [...document.querySelectorAll('.paths .card, .paths .section-heading')];
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
   }
  });
 }, { threshold: 0.07 });
 targets.forEach(target => { target.classList.add('reveal-ready'); observer.observe(target); });
 motionPreference.addEventListener('change', event => {
  if (event.matches) { targets.forEach(target => target.classList.add('is-visible')); observer.disconnect(); }
 });
}
