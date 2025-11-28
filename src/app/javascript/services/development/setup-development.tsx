console.log('development page init');

import { createRoot } from 'react-dom/client';
import { createApp } from 'vue';

import ReactSample from './react/ReactSample';
import VueSample from './vue/VueSample.vue';

let el = null;

el = document.getElementById('react-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  const root = createRoot(el);
  root.render(<ReactSample name={all.name} />);
}

el = document.getElementById('vue-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log(all);

  createApp(VueSample, { name: all.name }).mount(el);
}
