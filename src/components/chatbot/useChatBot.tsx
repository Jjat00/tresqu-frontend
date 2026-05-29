import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { streamChat, type HistoryTurn } from "@/services/agents/chatStream";
import { agentDecisionsService } from "@/services/wallbit";
import type {
  ChatMsg,
  PendingConfirmation,
  RawPendingConfirmation,
} from "@/types/chat";

interface UseChatBotOptions {
  agentId: string;
  greeting: string;
}

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

export const useChatBot = ({ agentId, greeting }: UseChatBotOptions) => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: newId(), role: "assistant", content: greeting },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { toast } = useToast();

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
      agentId,
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
        onToken: (token) =>
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + token.text }
                : m,
            ),
          ),
        onFinal: (final) => {
          // ``final.text`` is authoritative — it replaces whatever the tokens
          // accumulated (normally identical), and covers paths that emit no
          // tokens at all (risk profiler, errors surfaced as a final).
          patchMessage(assistantId, {
            content: final.text,
            pending: normalizePending(final.pending_confirmation),
          });
          setIsProcessing(false);
        },
        onError: (errText) => {
          patchMessage(assistantId, { content: errText, error: true });
          setIsProcessing(false);
        },
      },
      controller.signal,
    );
  };

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
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    messageEndRef,
    handleSendMessage,
    onConfirm: (messageId: string, decisionId: number) =>
      resolveConfirmation(messageId, decisionId, "confirm"),
    onCancel: (messageId: string, decisionId: number) =>
      resolveConfirmation(messageId, decisionId, "cancel"),
  };
};
