import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/pages/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { GalleriesPage } from "@/pages/GalleriesPage";
import { PrivacyPage } from "@/pages/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="quem-somos" element={<AboutPage />} />
          <Route path="galerias" element={<GalleriesPage />} />
          <Route path="politica-de-privacidade" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
