import CumulativeBalanceChart from "@/components/dashboard/CumulativeBalanceChart";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import { MonthlyComparisonChart } from "@/components/dashboard/expenses/MonthlyComparisonChart";
import { DateRange } from "@/components/dashboard/DateRangePicker";

import PortfolioOverviewCard from "./PortfolioOverviewCard";

interface HomeTabProps {
  dateRange: DateRange;
}

const HomeTab = ({ dateRange }: HomeTabProps) => {
  return (
    <div className="space-y-3 md:space-y-4 flex flex-col">
      <DashboardSummary dateRange={dateRange} />

      <PortfolioOverviewCard />

      <div
        className="glass-card animate-fade-up"
        style={{ animationDelay: "0.15s" }}
      >
        <MonthlyComparisonChart />
      </div>

      <CumulativeBalanceChart />
    </div>
  );
};

export default HomeTab;
