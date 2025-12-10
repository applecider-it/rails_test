console.log('admin init');

import { createRoot } from 'react-dom/client';

import AdminCommon from './react/AdminCommon';

const el: any = document.getElementById('app-admin-container-common');

if (el) {
  const root = createRoot(el);
  root.render(<AdminCommon />);
}

