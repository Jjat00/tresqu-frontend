import { useState } from "react";
import { AlertTriangle, Check, Loader2, ShieldAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PendingConfirmation } from "@/types/chat";

interface ConfirmationCardProps {
  pending: PendingConfirmation;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
}

const ConfirmationCard = ({ pending, onConfirm, onCancel }: ConfirmationCardProps) => {
  const [busy, setBusy] = useState(false);
  // Two-step operations require an explicit second confirmation.
  const [armed, setArmed] = useState(!pending.extra_two_step);

  const handleConfirm = async () => {
    if (!armed) {
      setArmed(true);
      return;
    }
    setBusy(true);
    await onConfirm();
  };

  const handleCancel = async () => {
    setBusy(true);
    await onCancel();
  };

  return (
    <div className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-2.5 text-xs">
      <div className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
        {pending.extra_two_step ? (
          <ShieldAlert className="h-3.5 w-3.5" />
        ) : (
          <AlertTriangle className="h-3.5 w-3.5" />
        )}
        {pending.extra_two_step ? "Doble confirmación requerida" : "Confirmación requerida"}
      </div>

      <p className="mt-1.5 font-medium text-foreground">{pending.summary}</p>

      {pending.risk_warning && (
        <p className="mt-1 text-muted-foreground">🛡️ {pending.risk_warning}</p>
      )}

      <p className="mt-1.5 text-[11px] text-muted-foreground">
        Al confirmar se ejecuta una operación <strong>real</strong> con tu dinero
        en Wallbit.
      </p>

      <div className="mt-2 flex gap-2">
        <Button
          size="sm"
          className="h-7 flex-1 bg-success hover:bg-success/90 text-xs"
          onClick={handleConfirm}
          disabled={busy}
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <Check className="mr-1 h-3.5 w-3.5" />
              {armed && pending.extra_two_step ? "Sí, ejecutar" : "Confirmar"}
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 flex-1 text-xs"
          onClick={handleCancel}
          disabled={busy}
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationCard;
