import { useState, useEffect } from "react";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { format } from "date-fns";
import { getAccessToken } from "@/services/authService";
import { env } from "@/config";

interface IncomeBarDataItem {
  name: string;
  value: number;
}

export const useIncomeBarData = (
  timeFilter: "month" | "quarter" | "year",
  dateRange?: DateRange
) => {
  const [data, setData] = useState<IncomeBarDataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = `${env.apiUrl}/api/incomes/bar_chart_data/`;

        // Add parameters
        const params = new URLSearchParams({ period: timeFilter });

        // Add date range if provided
        if (dateRange && dateRange.from && dateRange.to) {
          params.append("date_filter", "custom");
          params.append("start_date", format(dateRange.from, "yyyy-MM-dd"));
          params.append("end_date", format(dateRange.to, "yyyy-MM-dd"));
        }

        url += `?${params.toString()}`;

        // Get token using getAccessToken
        const token = getAccessToken();

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const responseData = await response.json();

        // Check if responseData has the expected structure
        if (responseData.data && Array.isArray(responseData.data)) {
          // Transform data for the chart
          const transformedData = responseData.data.map((item) => ({
            name: item.label,
            value: item.amount,
          }));

          setData(transformedData);
          setTotal(responseData.total);
        } else {
          // If the response doesn't have the expected structure, use fallback data
          console.log("API returned unexpected data structure:", responseData);
          const fallbackData = getFallbackData(timeFilter);
          setData(fallbackData);
          setTotal(fallbackData.reduce((sum, item) => sum + item.value, 0));
        }
      } catch (err: any) {
        console.error("Error fetching income bar data:", err);
        setError(err.message || "Error fetching income data");

        // Fallback to demo data if API fails
        const fallbackData = getFallbackData(timeFilter);
        setData(fallbackData);
        setTotal(fallbackData.reduce((sum, item) => sum + item.value, 0));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeFilter, dateRange]);

  return { data, isLoading, error, total };
};

// Fallback data in case API fails
const getFallbackData = (
  timeFilter: "month" | "quarter" | "year"
): IncomeBarDataItem[] => {
  const incomeDataByPeriod = {
    month: [
      { name: "Ene", value: 15000 },
      { name: "Feb", value: 15000 },
      { name: "Mar", value: 17500 },
      { name: "Abr", value: 15000 },
      { name: "May", value: 18500 },
    ],
    quarter: [
      { name: "Q1 2024", value: 42000 },
      { name: "Q2 2024", value: 45500 },
      { name: "Q3 2024", value: 47000 },
      { name: "Q4 2024", value: 48500 },
      { name: "Q1 2025", value: 51000 },
    ],
    year: [
      { name: "2022", value: 165000 },
      { name: "2023", value: 180000 },
      { name: "2024", value: 183000 },
      { name: "2025", value: 51000 },
    ],
  };

  return incomeDataByPeriod[timeFilter];
};
