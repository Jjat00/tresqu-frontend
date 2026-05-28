import { createElement } from "react";
import {
  Bot,
  LineChart,
  Receipt,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  tresqu: Bot,
  expenses: Receipt,
  wallbit: Wallet,
  analyst: LineChart,
  risk: ShieldCheck,
};

// Stable component so callers render <AgentIcon id=... /> instead of building a
// component during render (which the react-hooks lint rule forbids).
export const AgentIcon = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => createElement(ICONS[id] ?? Bot, { className });
