import './bootstrap/alpinejs';
import './bootstrap/container';
import './bootstrap/menu';

// 動作確認
import { showToast, setIsLoading } from '@/services/ui/message';

console.log('application init');

import { getCurrentUser } from './application';

const user = getCurrentUser();

console.log('currentUser', user);

/*
setTimeout(() => {
  showToast('Test');
  setIsLoading(true);
}, 1000);
 */
