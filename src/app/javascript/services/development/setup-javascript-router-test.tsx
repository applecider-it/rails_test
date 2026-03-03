import { createApp } from 'vue';

import RouterTestArea from './vue/RouterTestArea.vue';

const el = document.getElementById('root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log('vue all', all);

  createApp(RouterTestArea, { name: all.name }).mount(el);
}
