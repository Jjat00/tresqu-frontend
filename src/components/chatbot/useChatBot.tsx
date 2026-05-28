import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useTextToSpeech } from "./useTextToSpeech";
import { streamChat, type HistoryTurn } from "@/services/agents/chatStream";
import { agentDecisionsService } from "@/services/wallbit";
import type {
  ChatMsg,
  PendingConfirmation,
  RawPendingConfirmation,
} from "@/types/chat";

const GREETING =
  "¡Hola! Soy Tresqu, tu asistente financiero. Puedo registrar gastos e ingresos, consultar tu Wallbit, analizar acciones y más. ¿En qué te ayudo?";

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;

function normalizePending(
  raw: RawPendingConfirmation | null,
): PendingConfirmation | null {
  if (!raw || !raw.requires_confirmation) return null;
  if (typeof raw.confirmation_id !== "number") return null;
  return {
    confirmation_id: raw.confirmation_id,
    summary: raw.preview?.summary ?? "Operación pendiente",
    risk_warning: raw.preview?.risk_warning,
    extra_two_step: raw.extra_two_step,
  };
}

export const useChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: newId(), role: "assistant", content: GREETING },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { toast } = useToast();
  const { speakText } = useTextToSpeech();

  // Update a single message in place by id.
  const patchMessage = (id: string, patch: Partial<ChatMsg>) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );

  const handleSendMessage = (message = inputMessage) => {
    const text = message.trim();
    if (text === "" || isProcessing) return;

    const history: HistoryTurn[] = messages
      .filter((m) => m.content.trim() !== "")
      .map((m) => ({ role: m.role, content: m.content }));

    const assistantId = newId();
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "user", content: text },
      { id: assistantId, role: "assistant", content: "", steps: [] },
    ]);
    setInputMessage("");
    setIsProcessing(true);

    const controller = new AbortController();
    abortRef.current = controller;

    streamChat(
      text,
      history,
      {
        onStep: (step) =>
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, steps: [...(m.steps ?? []), step] }
                : m,
            ),
          ),
        onFinal: (final) => {
          patchMessage(assistantId, {
            content: final.text,
            pending: normalizePending(final.pending_confirmation),
          });
          setIsProcessing(false);
          if (voiceEnabled && final.text) speakText(final.text);
        },
        onError: (errText) => {
          patchMessage(assistantId, { content: errText, error: true });
          setIsProcessing(false);
        },
      },
      controller.signal,
    );
  };

  const { isRecording, isListening, toggleRecording } = useSpeechRecognition({
    onTranscript: setInputMessage,
    handleSendMessage,
  });

  const resolveConfirmation = async (
    messageId: string,
    decisionId: number,
    action: "confirm" | "cancel",
  ) => {
    patchMessage(messageId, { resolved: true });
    try {
      if (action === "cancel") {
        const res = await agentDecisionsService.cancel(decisionId);
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: res.detail },
        ]);
        return;
      }
      const res = await agentDecisionsService.confirm(decisionId);
      const ok = res.result?.ok;
      const tx = res.result?.wallbit_tx_uuid;
      const content = ok
        ? `✅ Operación ejecutada en Wallbit.${tx ? `\n\n🧾 Tx: \`${tx}\`` : ""}`
        : `❌ Wallbit rechazó la operación: ${res.result?.error ?? "error desconocido"}`;
      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "assistant", content, error: !ok },
      ]);
    } catch {
      toast({
        variant: "destructive",
        title: "No se pudo completar la operación",
        description: "Inténtalo de nuevo en unos momentos.",
      });
      patchMessage(messageId, { resolved: false });
    }
  };

  // Scroll to bottom when messages or steps change.
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Abort any in-flight stream on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  return {
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    isRecording,
    isListening,
    voiceEnabled,
    toggleVoice: () => setVoiceEnabled((v) => !v),
    messageEndRef,
    chatBodyRef,
    handleSendMessage,
    toggleRecording,
    onConfirm: (messageId: string, decisionId: number) =>
      resolveConfirmation(messageId, decisionId, "confirm"),
    onCancel: (messageId: string, decisionId: number) =>
      resolveConfirmation(messageId, decisionId, "cancel"),
  };
};
