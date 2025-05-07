
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
          // Custom date range
          url += `date_filter=custom&start_date=${format(dateRange.from, "yyyy-MM-dd")}&end_date=${format(dateRange.to, "yyyy-MM-dd")}`;
          
          // Add appropriate grouping based on the date range span and viewMode
          if (viewMode === "year") {
            url += "&group_by=month";
          } else if (viewMode === "month") {
            url += "&group_by=week";
          } else if (viewMode === "week") {
            url += "&group_by=day";
          } else if (viewMode === "day") {
            url += "&group_by=hour";
          }
        } else {
          // Use predefined filters if date range is not complete
          switch (viewMode) {
            case "day":
              url += "date_filter=today";
              break;
            case "week":
              url += "date_filter=current_week";
              break;
            case "month":
              url += "date_filter=current_month";
              break;
            case "year":
              url += "date_filter=current_year";
              break;
            default:
              url += "date_filter=current_week";
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
