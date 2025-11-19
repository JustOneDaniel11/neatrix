import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </HelmetProvider>
);
