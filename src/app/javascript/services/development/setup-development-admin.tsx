console.log('development page init');

import { createRoot } from 'react-dom/client';
import { createApp } from 'vue';

import TestAreaReactAdmin from './react/TestAreaReactAdmin';
import TestAreaVueAdmin from './vue/TestAreaVueAdmin.vue';

let el = null;

el = document.getElementById('react-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  const root = createRoot(el);
  root.render(<TestAreaReactAdmin name={all.name} apiUrl={all.apiUrl} />);
}

el = document.getElementById('vue-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  createApp(TestAreaVueAdmin, { name: all.name }).mount(el);
}
