import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon ? (
        <div className="mb-4 text-muted-foreground/40">{icon}</div>
      ) : (
        <svg
          className="w-16 h-16 mb-4 text-muted-foreground/30"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="12"
            width="48"
            height="40"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M24 32h16M32 24v16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-4 bg-success hover:bg-success/90"
          size="sm"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
