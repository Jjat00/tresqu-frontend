import {
  WalletIcon,
  TrendingUpIcon,
  TagIcon,
  LandmarkIcon,
  TargetIcon,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
}

const navItems: NavItem[] = [
  {
    id: "expenses",
    label: "Gastos",
    icon: WalletIcon,
    color: "text-muted-foreground",
    activeColor: "text-success bg-success/10",
  },
  {
    id: "income",
    label: "Ingresos",
    icon: TrendingUpIcon,
    color: "text-muted-foreground",
    activeColor: "text-highlight bg-highlight/10",
  },
  {
    id: "categories",
    label: "Categorías",
    icon: TagIcon,
    color: "text-muted-foreground",
    activeColor: "text-purple bg-purple/10",
  },
  {
    id: "debt",
    label: "Deudas",
    icon: LandmarkIcon,
    color: "text-muted-foreground",
    activeColor: "text-pink bg-pink/10",
  },
  {
    id: "savings",
    label: "Metas",
    icon: TargetIcon,
    color: "text-muted-foreground",
    activeColor: "text-cyan bg-cyan/10",
  },
  {
    id: "integrations",
    label: "Integraciones",
    icon: LinkIcon,
    color: "text-muted-foreground",
    activeColor: "text-foreground bg-muted",
  },
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Desktop sidebar
export const DesktopSidebar = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
}: DashboardSidebarProps) => {
  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-border bg-sidebar-background transition-all ${
        collapsed ? "w-16" : "w-52"
      }`}
    >
      <div className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? item.activeColor : `${item.color} hover:text-foreground hover:bg-muted/50`
              }`}
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
};

// Mobile bottom navigation
export const MobileBottomNav = ({
  activeTab,
  onTabChange,
}: Pick<DashboardSidebarProps, "activeTab" | "onTabChange">) => {
  // Show only the first 5 items in mobile bottom nav
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-14">
        {mobileItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
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
