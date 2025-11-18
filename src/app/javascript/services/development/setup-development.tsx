
console.log('test init')

import { createRoot } from "react-dom/client";
import SampleComponet from "./SampleComponet";

  const el = document.getElementById("test-container");
  if (el) {
    const root = createRoot(el);
    
    const all: any = JSON.parse(el.dataset.all);

    console.log(all);

    root.render(<SampleComponet name={all.name} />);
  }


