import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { useRouteScroll } from "@/hooks/useRouteScroll";

export function RootLayout() {
  useLenisScroll();
  useRouteScroll();

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
