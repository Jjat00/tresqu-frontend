import {
  WalletIcon,
  TrendingUpIcon,
  TagIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
}

const navItems: NavItem[] = [
  {
    id: "expenses",
    label: "Gastos",
    path: "/dashboard/expenses",
    icon: WalletIcon,
    color: "text-muted-foreground",
    activeColor: "text-success bg-success/10",
  },
  {
    id: "income",
    label: "Ingresos",
    path: "/dashboard/income",
    icon: TrendingUpIcon,
    color: "text-muted-foreground",
    activeColor: "text-highlight bg-highlight/10",
  },
  {
    id: "categories",
    label: "Categorías",
    path: "/dashboard/categories",
    icon: TagIcon,
    color: "text-muted-foreground",
    activeColor: "text-purple bg-purple/10",
  },
];

interface DashboardSidebarProps {
  activeTab: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Desktop sidebar
export const DesktopSidebar = ({
  activeTab,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`hidden lg:flex flex-col fixed top-14 left-0 bottom-0 z-20 border-r border-border bg-sidebar-background transition-all duration-200 ${
        collapsed ? "w-14" : "w-48"
      }`}
    >
      {/* Flecha colapsar/expandir arriba */}
      <div className="p-1.5 border-b border-border flex justify-end">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {collapsed ? "Expandir" : "Colapsar"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-3 space-y-1 px-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const btn = (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
              } ${
                isActive
                  ? item.activeColor
                  : `${item.color} hover:text-foreground hover:bg-muted/50`
              }`}
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>{btn}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return btn;
        })}
      </div>
    </aside>
  );
};

// Mobile bottom navigation
export const MobileBottomNav = ({
  activeTab,
}: Pick<DashboardSidebarProps, "activeTab">) => {
  const navigate = useNavigate();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${
                isActive ? item.activeColor.split(" ")[0] : item.color
              }`}
              aria-label={item.label}
            >
              <item.icon className={`h-4.5 w-4.5 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default navItems;
