
import { useState, useEffect } from "react";
import { getAccessToken } from "@/services/authService";
import { toast } from "sonner";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { format } from "date-fns";

export interface LineChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  tension: number;
}

export interface LineChartData {
  labels: string[];
  datasets: LineChartDataset[];
  filter_summary: string;
  total_amount: number;
}

export const useLineChartData = (dateRange: DateRange, viewMode: "day" | "week" | "month" | "year") => {
  const [data, setData] = useState<LineChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = getAccessToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        // Determine the correct date_filter parameter based on viewMode and dateRange
        let url = "https://web-production-11f27.up.railway.app/api/expenses/line_chart_data/?";
        
        if (dateRange.from && dateRange.to) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          
          // Check if dateRange is for today
          const isToday = dateRange.from.getTime() === today.getTime() && 
                          dateRange.to.getTime() === today.getTime();
                          
          // Check if dateRange is for yesterday
          const isYesterday = dateRange.from.getTime() === yesterday.getTime() && 
                             dateRange.to.getTime() === yesterday.getTime();
          
          if (isToday) {
            // Use 'today' filter for today's data
            url += "date_filter=today";
          } else if (isYesterday) {
            // Use 'yesterday' filter for yesterday's data
            url += "date_filter=yesterday";
          } else {
            // Custom date range
            url += `date_filter=custom&start_date=${format(dateRange.from, "yyyy-MM-dd")}&end_date=${format(dateRange.to, "yyyy-MM-dd")}`;
            
            // For custom date ranges, always group by day regardless of view mode
            url += "&group_by=day";
          }
        } else {
          // Use predefined filters if date range is not complete
          switch (viewMode) {
            case "day":
              url += "date_filter=today";
              break;
            case "week":
              url += "date_filter=current_week&group_by=day"; // Explicitly group by day for week view
              break;
            case "month":
              url += "date_filter=current_month";
              break;
            case "year":
              url += "date_filter=current_year";
              break;
            default:
              url += "date_filter=current_week&group_by=day";
          }
        }

        console.log("Fetching line chart data from:", url);

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching line chart data: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error in useLineChartData:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        toast.error("No se pudieron cargar los datos del gráfico");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, viewMode]);

  return { data, isLoading, error };
};
