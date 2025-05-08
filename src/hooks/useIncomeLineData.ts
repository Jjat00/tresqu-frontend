
import { useState, useEffect } from "react";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { format } from "date-fns";

interface IncomeLineDataItem {
  name: string;
  amount: number;
}

export interface IncomeLineChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
  total_amount: number;
  filter_summary?: string;
}

export const useIncomeLineData = (
  dateRange?: DateRange,
  viewMode: "day" | "week" | "month" | "year" = "week"
) => {
  const [data, setData] = useState<IncomeLineChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = "https://web-production-11f27.up.railway.app/api/incomes/line_chart_data/";
        
        // Add parameters
        const params = new URLSearchParams({ group_by: viewMode });
        
        // Add date range if provided
        if (dateRange && dateRange.from && dateRange.to) {
          params.append("date_filter", "custom");
          params.append("start_date", format(dateRange.from, "yyyy-MM-dd"));
          params.append("end_date", format(dateRange.to, "yyyy-MM-dd"));
        }
        
        url += `?${params.toString()}`;

        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(url, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err: any) {
        console.error("Error fetching income line data:", err);
        setError(err.message || "Error fetching income line data");
        
        // Set fallback data if API fails
        setData(getFallbackData(viewMode));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, viewMode]);

  return { data, isLoading, error };
};

// Fallback data in case API fails
const getFallbackData = (viewMode: string): IncomeLineChartData => {
  // Generate different data based on the view mode
  let labels: string[] = [];
  let values: number[] = [];
  
  switch(viewMode) {
    case 'day':
      labels = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      values = [0, 0, 2500, 0, 4500, 0, 0];
      break;
    case 'week':
      labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      values = [3500, 0, 2500, 0, 15000, 4500, 0];
      break;
    case 'month':
      labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      values = [5500, 2500, 17500, 4500];
      break;
    case 'year':
      labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      values = [15000, 15000, 17500, 15000, 18500, 16000, 15000, 16500, 17000, 16000, 15000, 20000];
      break;
    default:
      labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      values = [3500, 0, 2500, 0, 15000, 4500, 0];
  }
  
  return {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: values,
      }
    ],
    total_amount: values.reduce((sum, val) => sum + val, 0),
    filter_summary: `Ingresos por ${viewMode === 'day' ? 'día' : 
                      viewMode === 'week' ? 'semana' : 
                      viewMode === 'month' ? 'mes' : 'año'}`
  };
};
