import { createRoot } from 'react-dom/client';

import AppCommon from '../react/AppCommon';

const el: any = document.getElementById('app-container-common');

if (el) {
  const root = createRoot(el);
  root.render(<AppCommon />);
}