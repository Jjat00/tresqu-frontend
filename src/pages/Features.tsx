import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Mic,
  Camera,
  Banknote,
  ListPlus,
  CalendarDays,
  Globe,
  Coins,
  Tags,
  Mail,
  BellRing,
  Reply,
  Brain,
  Trash2,
  Search,
  Filter,
  Sparkles,
  Pencil,
  Hand,
  Layers,
  Wallet,
  Compass,
  ShieldCheck,
  ArrowLeftRight,
  PiggyBank,
  CreditCard,
  Pause,
  TrendingUp,
  LineChart,
  Gauge,
  ShieldAlert,
  BarChart3,
  Table2,
  FileSpreadsheet,
  Palette,
  MessagesSquare,
  Radar,
  Settings2,
  KeyRound,
  CopyCheck,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import DotField from "@/components/home/DotField";
import WhatsAppIcon from "@/components/home/WhatsAppIcon";
import { pathFor, useCopy, useLocale } from "@/i18n";
import {
  featuresPageCopy,
  type FeatureItemCopy,
} from "@/i18n/copy/features";
import "@/styles/noche.css";

type Tone = "green" | "blue";

// Estructura de cada sección (id de anchor, tono e iconos).
// El copy vive en src/i18n/copy/features.tsx, mismo orden de secciones e items.
const sectionStructure: { id: string; tone: Tone; icons: LucideIcon[] }[] = [
  {
    id: "registro",
    tone: "green",
    icons: [MessageSquare, Mic, Camera, Banknote, ListPlus, CalendarDays, Globe, Coins, Tags],
  },
  {
    id: "gmail",
    tone: "green",
    icons: [Mail, BellRing, Reply, Brain, Trash2, CopyCheck, Settings2],
  },
  {
    id: "control",
    tone: "green",
    icons: [Search, Filter, Sparkles, Pencil, Trash2, Hand, Layers],
  },
  {
    id: "inversiones",
    tone: "blue",
    icons: [Wallet, Compass, ShieldCheck, ArrowLeftRight, PiggyBank, CreditCard, Pause, Table2],
  },
  {
    id: "analisis",
    tone: "blue",
    icons: [TrendingUp, LineChart, Gauge, ShieldAlert, Layers],
  },
  {
    id: "dashboard",
    tone: "green",
    icons: [KeyRound, BarChart3, Table2, FileSpreadsheet, Palette, LineChart, MessagesSquare, Radar, Settings2],
  },
];

const FeatureCard = ({
  Icon,
  tone,
  title,
  description,
  channels,
  isNew,
  newBadge,
}: FeatureItemCopy & { Icon: LucideIcon; tone: Tone; newBadge: string }) => (
  <article className="tq-surface tq-fx-card">
    <div className="tq-fx-card-top">
      <div className={`tq-fx-icon is-${tone}`}>
        <Icon aria-hidden="true" />
      </div>
      {isNew && <span className="tq-tag tq-tag-new">{newBadge}</span>}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    {channels && (
      <div className="tq-fx-tags">
        {channels.map((channel) => (
          <span key={channel} className="tq-tag">
            {channel}
          </span>
        ))}
      </div>
    )}
  </article>
);

/**
 * Guía pública de funciones (/funciones y /en/features), estilo «Noche de
 * puntos»: retícula de puntos en el hero, titulares ligeros con acento de
 * color y tarjetas sobrias como las de la landing.
 */
const Features = () => {
  const locale = useLocale();
  const copy = useCopy(featuresPageCopy);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tq-page">
      <Seo page="features" />
      <Header />

      <main>
        {/* Hero */}
        <section className="tq-fx-hero" aria-labelledby="features-title">
          <DotField />
          <div className="tq-fx-hero-inner">
            <p className="tq-eyebrow">{copy.heroLabel}</p>
            <h1 id="features-title" className="tq-display">
              {copy.heroTitle}
            </h1>
            <p className="tq-lead">{copy.heroIntro}</p>
            {/* Quick nav */}
            <nav className="tq-fx-nav" aria-label={copy.heroLabel}>
              {copy.sections.map((section, index) => (
                <a
                  key={sectionStructure[index].id}
                  href={`#${sectionStructure[index].id}`}
                >
                  {section.badge}
                </a>
              ))}
              <a href="#canales">{copy.navChannels}</a>
            </nav>
          </div>
        </section>

        {/* Feature sections */}
        {copy.sections.map((section, sectionIndex) => {
          const structure = sectionStructure[sectionIndex];
          return (
            <section
              key={structure.id}
              id={structure.id}
              className="tq-fx-section"
              aria-labelledby={`${structure.id}-title`}
            >
              <div className="tq-wrap">
                <div className="tq-fx-head">
                  <p className={`tq-eyebrow tq-fx-eyebrow is-${structure.tone}`}>
                    {section.badge}
                  </p>
                  <h2 id={`${structure.id}-title`} className="tq-h2">
                    {section.title}
                  </h2>
                  <p className="tq-lead">{section.intro}</p>
                </div>
                <div className="tq-fx-grid">
                  {section.items.map((item, itemIndex) => (
                    <FeatureCard
                      key={item.title}
                      {...item}
                      Icon={structure.icons[itemIndex]}
                      tone={structure.tone}
                      newBadge={copy.newBadge}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Channel matrix */}
        <section
          id="canales"
          className="tq-fx-section"
          aria-labelledby="canales-title"
        >
          <div className="tq-wrap">
            <div className="tq-fx-head">
              <p className="tq-eyebrow tq-fx-eyebrow is-green">
                {copy.channelsLabel}
              </p>
              <h2 id="canales-title" className="tq-h2">
                {copy.channelsTitle}
              </h2>
              <p className="tq-lead">{copy.channelsIntro}</p>
            </div>
            <div className="tq-fx-grid">
              {copy.channelMatrix.map((channel) => (
                <article
                  key={channel.name}
                  className={`tq-surface tq-fx-card tq-fx-channel ${
                    channel.highlight ? "is-highlight tq-grad-border" : ""
                  }`}
                >
                  <div className="tq-fx-card-top">
                    <h3>{channel.name}</h3>
                    {channel.highlight && (
                      <span className="tq-tag tq-tag-new">
                        {copy.recommendedBadge}
                      </span>
                    )}
                  </div>
                  <ul>
                    {channel.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="tq-fx-cta" aria-labelledby="features-cta-title">
          <div className="tq-wrap">
            <h2 id="features-cta-title" className="tq-h2">
              {copy.ctaTitle}
            </h2>
            <p className="tq-lead">{copy.ctaBody}</p>
            <div className="tq-ctas">
              <a
                href={copy.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tq-btn tq-btn-wa"
              >
                <WhatsAppIcon />
                {copy.ctaWhatsApp}
              </a>
              <Link
                to={pathFor("login", locale)}
                className="tq-btn tq-btn-dash tq-grad-border"
              >
                {copy.ctaLogin}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
