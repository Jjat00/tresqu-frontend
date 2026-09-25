import { useEffect, useState } from "react";
import { Camera, Mail, MessageSquare, Mic, Play } from "lucide-react";
import { useCopy } from "@/i18n";
import { landingCopy, type CaptureMode, type LandingCopy } from "@/i18n/copy/landing";
import { useInView } from "@/hooks/useInView";
import Reveal from "./Reveal";
import { stagger } from "./stagger";

const SCENE_MS = 5200;

const modeIcons: Record<CaptureMode, typeof MessageSquare> = {
  text: MessageSquare,
  voice: Mic,
  photo: Camera,
  gmail: Mail,
};

type Chat = LandingCopy["live"]["chat"];

/** Tarjeta de confirmación que responde Tresqu. */
const Receipt = ({ label, amount, category }: { label: string; amount: string; category: string }) => (
  <div className="w-[240px] rounded-2xl rounded-tl-md border border-white/[0.08] bg-[#151515] p-4">
    <div className="flex items-center gap-2 text-[12px] text-[#00FF7F]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF7F]" />
      {label}
    </div>
    <p className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-white tabular-nums">
      {amount}
    </p>
    <span className="mt-2 inline-block rounded-full border border-white/10 px-2.5 py-0.5 text-[12px] text-zinc-400">
      {category}
    </span>
  </div>
);

const UserBubble = ({ children }: { children: React.ReactNode }) => (
  <div className="lx-bubble self-end max-w-[78%] rounded-2xl rounded-br-md bg-[#00FF7F] px-4 py-2.5 text-[15px] leading-snug text-black">
    {children}
  </div>
);

const Typing = () => (
  <div className="lx-bubble flex w-fit gap-1 rounded-2xl rounded-tl-md bg-[#151515] px-4 py-3.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-zinc-500"
        style={{ animation: `wa-typing 1s ${i * 0.15}s infinite` }}
      />
    ))}
  </div>
);

/** Una escena de la conversación: lo que manda el usuario + la respuesta. */
const Scene = ({ mode, chat }: { mode: CaptureMode; chat: Chat }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 650);
    const t2 = window.setTimeout(() => setPhase(2), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  let input: React.ReactNode;
  let reply: React.ReactNode;

  if (mode === "text") {
    input = <UserBubble>{chat.text.user}</UserBubble>;
    reply = <Receipt {...chat.text} />;
  } else if (mode === "voice") {
    input = (
      <div className="lx-bubble self-end flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-3 rounded-2xl rounded-br-md bg-[#00FF7F] px-3.5 py-2.5 text-black">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black/85">
            <Play className="h-3 w-3 fill-[#00FF7F] text-[#00FF7F]" />
          </span>
          <span className="flex h-6 items-center gap-[3px]">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-black/70"
                style={{
                  height: `${30 + ((i * 37) % 70)}%`,
                  animation: `wa-wave ${0.5 + (i % 5) * 0.12}s ${i * 0.04}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </span>
          <span className="text-[12px] font-medium tabular-nums">{chat.voice.duration}</span>
        </div>
        <span className="text-[12px] italic text-zinc-500">{chat.voice.transcript}</span>
      </div>
    );
    reply = <Receipt {...chat.voice} />;
  } else if (mode === "photo") {
    input = (
      <div className="lx-bubble self-end rounded-2xl rounded-br-md bg-[#00FF7F] p-1.5">
        <div className="relative h-[150px] w-[124px] overflow-hidden rounded-xl bg-[#f4f1ea] px-3 py-3">
          <p className="text-center font-mono text-[8px] font-bold tracking-widest text-black/70">
            {chat.photo.merchant.toUpperCase()}
          </p>
          <div className="mt-2 space-y-1.5">
            {[70, 52, 64, 44, 58].map((w, i) => (
              <div key={i} className="flex justify-between">
                <span className="h-[3px] rounded bg-black/25" style={{ width: `${w}%` }} />
                <span className="h-[3px] w-[18%] rounded bg-black/25" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-dashed border-black/30 pt-2">
            <span className="h-[4px] w-[30%] rounded bg-black/60" />
            <span className="h-[4px] w-[26%] rounded bg-black/60" />
          </div>
          {/* Línea de escaneo */}
          <span
            className="absolute left-0 right-0 h-[2px] bg-[#00FF7F] shadow-[0_0_14px_2px_rgba(0,255,127,0.8)]"
            style={{ animation: "wa-scan 1.4s ease-in-out forwards" }}
          />
        </div>
        <p className="px-1.5 pt-1 text-[11px] text-black/70">{chat.photo.caption}</p>
      </div>
    );
    reply = <Receipt label={chat.photo.label} amount={chat.photo.amount} category={chat.photo.category} />;
  } else {
    input = (
      <div className="lx-bubble self-center flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] py-2 pl-2 pr-4">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EA4335]/15">
          <Mail className="h-3.5 w-3.5 text-[#EA4335]" />
        </span>
        <span className="text-[13px] text-zinc-300">
          {chat.gmail.notice}
          <span className="text-zinc-500"> · {chat.gmail.subject}</span>
        </span>
      </div>
    );
    reply = (
      <div className="flex flex-col gap-2">
        <Receipt label={chat.gmail.label} amount={chat.gmail.amount} category={chat.gmail.category} />
        <p className="lx-bubble max-w-[260px] rounded-2xl rounded-tl-md bg-[#151515] px-4 py-2.5 text-[14px] leading-snug text-zinc-300" style={{ animationDelay: "0.35s" }}>
          {chat.gmail.note}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {input}
      {phase === 1 && <Typing />}
      {phase === 2 && <div className="lx-bubble">{reply}</div>}
    </div>
  );
};

const LiveSection = () => {
  const copy = useCopy(landingCopy).live;
  const [active, setActive] = useState(0);
  // Cada vuelta completa reinicia la conversación desde el primer mensaje.
  const [cycle, setCycle] = useState(0);
  const { ref: stageRef, isInView } = useInView({ threshold: 0.35, triggerOnce: false });

  // Avanza de escena solo mientras la sección está en pantalla.
  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (active === copy.modes.length - 1) {
        setCycle((c) => c + 1);
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, SCENE_MS);
    return () => clearTimeout(t);
  }, [active, isInView, copy.modes.length]);

  return (
    <section id="vives" className="lx-section overflow-hidden">
      <div className="container mx-auto max-w-7xl px-5 md:px-8">
        <div ref={stageRef} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Texto + modos */}
          <Reveal className="lg:col-span-5">
            <p className="lx-eyebrow lx-rise" style={stagger(0)}>{copy.eyebrow}</p>
            <h2 className="lx-h2 lx-rise mt-6" style={stagger(1)}>{copy.title}</h2>
            <p className="lx-lead lx-rise mt-6 max-w-md" style={stagger(2)}>{copy.lead}</p>

            <ul className="mt-12 max-w-md">
              {copy.modes.map((m, i) => {
                const Icon = modeIcons[m.id];
                const on = i === active;
                return (
                  <li key={m.id} className="lx-rise border-t border-white/[0.07] last:border-b" style={stagger(3 + i)}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className="group relative w-full cursor-pointer py-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          className={`h-[18px] w-[18px] transition-colors duration-300 ${on ? "text-[#00FF7F]" : "text-zinc-600 group-hover:text-zinc-400"}`}
                        />
                        <span
                          className={`text-[17px] font-medium transition-colors duration-300 ${on ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
                        >
                          {m.title}
                        </span>
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <p className="overflow-hidden pl-[34px] text-[15px] text-zinc-400">
                          <span className="block pt-1.5">{m.description}</span>
                        </p>
                      </div>
                      {on && (
                        <span className="absolute -top-px left-0 right-0 h-px overflow-hidden">
                          <span
                            key={`${active}-${isInView}`}
                            className="lx-progress block h-full bg-[#00FF7F]"
                            style={{
                              animationDuration: `${SCENE_MS}ms`,
                              animationPlayState: isInView ? "running" : "paused",
                            }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Conversación */}
          <Reveal className="lg:col-span-7 lg:pl-10">
            <div className="lx-rise relative mx-auto max-w-[520px]" style={stagger(2)}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 -z-10 opacity-70"
                style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(0,255,127,0.13), transparent 70%)" }}
              />
              <div className="lx-surface overflow-hidden">
                {/* Barra del chat */}
                <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
                  <img src="/3q.png" alt="" className="h-9 w-9 rounded-full" />
                  <div className="leading-tight">
                    <p className="text-[15px] font-semibold text-white">Tresqu</p>
                    <p className="flex items-center gap-1.5 text-[12px] text-zinc-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF7F]" />
                      {copy.chat.status}
                    </p>
                  </div>
                </div>
                <div
                  className="flex h-[440px] flex-col justify-end gap-6 overflow-hidden px-5 pb-6"
                  style={{ maskImage: "linear-gradient(to bottom, transparent, #000 22%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 22%)" }}
                  aria-live="polite"
                >
                  {copy.modes.slice(0, active + 1).map((m) => (
                    <Scene key={`${cycle}-${m.id}`} mode={m.id} chat={copy.chat} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LiveSection;
