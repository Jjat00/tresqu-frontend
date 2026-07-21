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
import { pathFor, useCopy, useLocale } from "@/i18n";
import {
  featuresPageCopy,
  type FeatureItemCopy,
} from "@/i18n/copy/features";

// Estructura de cada sección (id de anchor, acento e iconos).
// El copy vive en src/i18n/copy/features.tsx, mismo orden de secciones e items.
const sectionStructure: { id: string; accent: string; icons: LucideIcon[] }[] = [
  {
    id: "registro",
    accent: "#00FF7F",
    icons: [MessageSquare, Mic, Camera, Banknote, ListPlus, CalendarDays, Globe, Coins, Tags],
  },
  {
    id: "gmail",
    accent: "#00FF7F",
    icons: [Mail, BellRing, Reply, Brain, Trash2, CopyCheck, Settings2],
  },
  {
    id: "control",
    accent: "#00FF7F",
    icons: [Search, Filter, Sparkles, Pencil, Trash2, Hand, Layers],
  },
  {
    id: "inversiones",
    accent: "#0D99FF",
    icons: [Wallet, Compass, ShieldCheck, ArrowLeftRight, PiggyBank, CreditCard, Pause, Table2],
  },
  {
    id: "analisis",
    accent: "#0D99FF",
    icons: [TrendingUp, LineChart, Gauge, ShieldAlert, Layers],
  },
  {
    id: "dashboard",
    accent: "#00FF7F",
    icons: [KeyRound, BarChart3, Table2, FileSpreadsheet, Palette, LineChart, MessagesSquare, Radar, Settings2],
  },
];

const FeatureCard = ({
  Icon,
  title,
  description,
  channels,
  isNew,
  newBadge,
}: FeatureItemCopy & { Icon: LucideIcon; newBadge: string }) => (
  <div className="group holo-card holo-sheen p-6 lg:p-8">
    <div className="flex items-start justify-between mb-6">
      <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00FF7F] transition-all duration-300 group-hover:border-[#00FF7F]/40 group-hover:shadow-[0_0_20px_-6px_rgba(0,255,127,0.6)]">
        <Icon className="w-5 h-5" />
      </div>
      {isNew && (
        <span className="px-2 py-0.5 border border-[#00FF7F]/30 bg-[#00FF7F]/5 rounded-sm text-[10px] uppercase tracking-wider text-[#00FF7F] font-medium">
          {newBadge}
        </span>
      )}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 font-display tracking-tight">
      {title}
    </h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    {channels && (
      <div className="flex flex-wrap gap-1.5 mt-4">
        {channels.map((channel) => (
          <span
            key={channel}
            className="px-2 py-0.5 border border-white/10 rounded-sm text-[10px] uppercase tracking-wider text-zinc-500 font-medium"
          >
            {channel}
          </span>
        ))}
      </div>
    )}
  </div>
);

const Features = () => {
  const locale = useLocale();
  const copy = useCopy(featuresPageCopy);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      <Seo page="features" />
      <Header />

      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label mb-6">{copy.heroLabel}</span>
            <h1 className="trii-title text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              {copy.heroTitle}
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
              {copy.heroIntro}
            </p>
            {/* Quick nav */}
            <nav className="flex flex-wrap justify-center gap-2">
              {copy.sections.map((section, index) => (
                <a
                  key={sectionStructure[index].id}
                  href={`#${sectionStructure[index].id}`}
                  className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-sm text-xs font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-colors duration-200"
                >
                  {section.badge}
                </a>
              ))}
              <a
                href="#canales"
                className="px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-sm text-xs font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                {copy.navChannels}
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Feature sections */}
      {copy.sections.map((section, sectionIndex) => {
        const structure = sectionStructure[sectionIndex];
        return (
          <section
            key={structure.id}
            id={structure.id}
            className="relative section-padding bg-[#0a0a0a] scroll-mt-24"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
            </div>
            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <div className="max-w-3xl mb-12 md:mb-16">
                <span
                  className="inline-block px-3 py-1 border rounded-sm text-xs uppercase tracking-wider font-medium mb-6"
                  style={{
                    color: structure.accent,
                    borderColor: `${structure.accent}40`,
                  }}
                >
                  {section.badge}
                </span>
                <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-5">
                  {section.title}
                </h2>
                <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
                  {section.intro}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {section.items.map((item, itemIndex) => (
                  <FeatureCard
                    key={item.title}
                    {...item}
                    Icon={structure.icons[itemIndex]}
                    newBadge={copy.newBadge}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Channel matrix */}
      <section id="canales" className="relative section-padding bg-[#0a0a0a] scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="section-label mb-6">{copy.channelsLabel}</span>
            <h2 className="trii-title text-3xl sm:text-4xl md:text-5xl text-white mb-5">
              {copy.channelsTitle}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
              {copy.channelsIntro}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {copy.channelMatrix.map((channel) => (
              <div
                key={channel.name}
                className={`holo-card holo-sheen p-6 lg:p-8 ${
                  channel.highlight ? "hud-corners" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white font-display tracking-tight">
                    {channel.name}
                  </h3>
                  {channel.highlight && (
                    <span className="px-2 py-0.5 border border-[#00FF7F]/30 bg-[#00FF7F]/5 rounded-sm text-[10px] uppercase tracking-wider text-[#00FF7F] font-medium">
                      {copy.recommendedBadge}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {channel.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-400"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#00FF7F] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding bg-[#0a0a0a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="holo-card holo-sheen hud-corners max-w-3xl mx-auto text-center p-10 md:p-14">
            <h2 className="trii-title text-3xl sm:text-4xl text-white mb-5">
              {copy.ctaTitle}
            </h2>
            <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
              {copy.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={copy.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-neon inline-flex items-center justify-center px-6 py-3 bg-[#00FF7F] text-black font-semibold text-sm rounded-md hover:bg-white"
              >
                {copy.ctaWhatsApp}
              </a>
              <Link
                to={pathFor("login", locale)}
                className="inline-flex items-center justify-center px-6 py-3 bg-white/[0.03] border border-white/10 text-white font-semibold text-sm rounded-md hover:bg-white/[0.06] hover:border-white/20 transition-colors duration-200"
              >
                {copy.ctaLogin}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Features;
