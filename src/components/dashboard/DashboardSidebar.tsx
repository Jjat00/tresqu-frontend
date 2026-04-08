import {
  WalletIcon,
  TrendingUpIcon,
  TagIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
              onClick={() => navigate(item.path)}
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
