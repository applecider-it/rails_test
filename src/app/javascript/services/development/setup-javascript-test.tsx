console.log('development page init');

import { createRoot } from 'react-dom/client';

import TestAreaReact from './react/TestAreaReact';

let el = null;

el = document.getElementById('react-root');
if (el) {
  const all: any = JSON.parse(el.dataset.all);

  console.log('react all', all);

  const root = createRoot(el);
  root.render(<TestAreaReact name={all.name} formData={all.formData} />);
}

