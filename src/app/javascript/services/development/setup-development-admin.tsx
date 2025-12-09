console.log('development page init');

import { createRoot } from 'react-dom/client';
import { createApp } from 'vue';

import TestAreaAdmin from './react/TestAreaAdmin';
import TestAreaVueAdmin from './vue/TestAreaVueAdmin.vue';

let el = null;

el = document.getElementById('react-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  const root = createRoot(el);
  root.render(<TestAreaAdmin name={all.name} />);
}

el = document.getElementById('vue-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  createApp(TestAreaVueAdmin, { name: all.name }).mount(el);
}
