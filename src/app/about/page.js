import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AboutPage from "./AboutPage";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AboutPage />
  </StrictMode>
);
