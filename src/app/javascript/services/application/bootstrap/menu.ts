/** メニューのセットアップ */
function setupMenu() {
  const button = document.getElementById('app-nav-mobile-menu-button');
  const menu = document.getElementById('app-nav-mobile-menu');
  button?.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

setupMenu();
