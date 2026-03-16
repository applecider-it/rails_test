import '@/services/application/bootstrap/container';

console.log('admin/application init');

// 動作確認
import { showToast, setIsLoading } from '@/services/ui/message';

import { getCurrentAdminUser } from './application';

const adminUser = getCurrentAdminUser();
console.log('auth admin user', adminUser);

/*
setTimeout(() => {
  showToast('Test');
  setIsLoading(true);
}, 1000);
 */
