console.log('application init');

import { createRoot } from 'react-dom/client';
import { getCurrentUser } from '@/services/application/application';

import AppCommon from '@/services/application/react/AppCommon';

const user = getCurrentUser();

console.log('currentAdminUser', user);

const el: any = document.getElementById('app-container-common');

if (el) {
  const root = createRoot(el);
  root.render(<AppCommon />);
}

/*
// UI動作確認
import { showToast, setIsLoading } from '@/services/ui/message';

setTimeout(() => {
  showToast('Test');
  setIsLoading(true);
}, 1000);
 */
