import './bootstrap/container';
import './bootstrap/menu';

console.log('application init');

import { getCurrentUser } from './application';

const user = getCurrentUser();

console.log('currentUser', user);
