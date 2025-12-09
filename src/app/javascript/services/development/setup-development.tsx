console.log('development page init');

import { createRoot } from 'react-dom/client';
import { createApp } from 'vue';

import TestAreaReact from './react/TestAreaReact';
import TestAreaVue from './vue/TestAreaVue.vue';

let el = null;

el = document.getElementById('react-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  const root = createRoot(el);
  root.render(<TestAreaReact name={all.name} />);
}

el = document.getElementById('vue-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  createApp(TestAreaVue, { name: all.name }).mount(el);
}
