import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageDots from "@/components/PageDots";
import "@/styles/noche.css";

interface LegalLayoutProps {
  title: ReactNode;
  /** Línea de «última actualización», si la página la tiene */
  updated?: ReactNode;
  children: ReactNode;
}

/**
 * Marco de las páginas legales (privacidad, términos, privacidad de
 * Facebook) con el estilo «Noche de puntos»: nav en píldora, retícula de
 * puntos arriba, titular ligero y texto legible a 760 px. El texto legal
 * va tal cual en children.
 */
const LegalLayout = ({ title, updated, children }: LegalLayoutProps) => (
  <div className="tq-page">
    <Header />
    <PageDots />
    <main>
      <article className="tq-legal">
        <p className="tq-eyebrow">Legal</p>
        <h1>{title}</h1>
        {updated && <p className="tq-legal-meta">{updated}</p>}
        <div className="tq-legal-body">{children}</div>
      </article>
    </main>
    <Footer />
  </div>
);

export default LegalLayout;
