
console.log('test init')

import { createRoot } from "react-dom/client";
import TestComponet from "./TestComponet";

  const el = document.getElementById("test");
  if (el) {
    const root = createRoot(el);
    
    const all: any = JSON.parse(el.dataset.all);

    console.log(all);

    root.render(<TestComponet name={all.name} />);
  }


