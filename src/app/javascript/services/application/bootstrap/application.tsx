import { createRoot } from 'react-dom/client';
import { getCurrentUser } from '../application';

import AppCommon from '../react/AppCommon';

const user = getCurrentUser();

console.log('currentUser', user);

const el: any = document.getElementById('app-container-common');

if (el) {
  const root = createRoot(el);
  root.render(<AppCommon />);
}