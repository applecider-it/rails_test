console.log('application init');

const button = document.getElementById('app-nav-mobile-menu-button');
const menu = document.getElementById('app-nav-mobile-menu');
button?.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
