console.log('application init');

import { createRoot } from 'react-dom/client';
import { getAuthUser } from './application';

import AppCommon from './react/AppCommon';

const user = getAuthUser();

console.log(user);

const el: any = document.getElementById('app-container-common');

if (el) {
  const root = createRoot(el);
  root.render(<AppCommon />);
}

/** メニューのセットアップ */
function setupMenu() {
  const button = document.getElementById('app-nav-mobile-menu-button');
  const menu = document.getElementById('app-nav-mobile-menu');
  button?.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

setupMenu();