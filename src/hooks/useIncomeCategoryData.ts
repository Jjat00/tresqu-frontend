
import { useState, useEffect } from "react";
import { DateRange } from "@/components/dashboard/DateRangePicker";
import { format } from "date-fns";

interface IncomeCategoryDataItem {
  category: string;
  amount: number;
  color: string;
  percent: number;
  subcategories?: { name: string; value: number }[];
}

interface IncomeCategoryResponse {
  categories: {
    name: string;
    amount: number;
    color: string;
    percent: number;
    subcategories: { name: string; value: number }[];
  }[];
  total: number;
}

export const useIncomeCategoryData = (dateRange?: DateRange) => {
  const [data, setData] = useState<IncomeCategoryDataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = "https://web-production-11f27.up.railway.app/api/incomes/donut_chart_data/";

        // Add date range parameters if provided
        if (dateRange && dateRange.from && dateRange.to) {
          const params = new URLSearchParams({
            date_filter: "custom",
            start_date: format(dateRange.from, "yyyy-MM-dd"),
            end_date: format(dateRange.to, "yyyy-MM-dd")
          });
          url += `?${params.toString()}`;
        }

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

        const responseData: IncomeCategoryResponse = await response.json();
        
        // Transform data for the chart
        const transformedData = responseData.categories.map(item => ({
          category: item.name,
          amount: item.amount,
          color: item.color || getRandomColor(item.name),
          percent: item.percent,
          subcategories: item.subcategories
        }));

        setData(transformedData);
        setTotal(responseData.total);
      } catch (err: any) {
        console.error("Error fetching income category data:", err);
        setError(err.message || "Error fetching income data");
        
        // Fallback to demo data if API fails
        const demoData = getFallbackData();
        setData(demoData);
        setTotal(demoData.reduce((sum, item) => sum + item.amount, 0));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return { data, isLoading, error, total };
};

// Helper function to get a random color based on string
const getRandomColor = (str: string) => {
  const colors = [
    "#4ade80", "#60a5fa", "#f472b6", "#a78bfa", 
    "#fb923c", "#38bdf8", "#a3e635", "#e879f9"
  ];
  
  // Generate a simple hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to pick a color
  return colors[Math.abs(hash) % colors.length];
};

// Fallback data in case API fails
const getFallbackData = (): IncomeCategoryDataItem[] => {
  return [
    {
      category: "Empleo",
      amount: 17000,
      color: "#4ade80",
      percent: 63,
      subcategories: [
        { name: "Salario base", value: 15000 },
        { name: "Bonos", value: 2000 }
      ]
    },
    {
      category: "Freelance",
      amount: 7700,
      color: "#60a5fa",
      percent: 28,
      subcategories: [
        { name: "Diseño gráfico", value: 3500 },
        { name: "Programación", value: 4200 }
      ]
    },
    {
      category: "Inversiones",
      amount: 1170,
      color: "#f472b6",
      percent: 4,
      subcategories: [
        { name: "Acciones", value: 850 },
        { name: "Depósitos", value: 320 }
      ]
    },
    {
      category: "Otros",
      amount: 1200,
      color: "#a78bfa",
      percent: 4,
      subcategories: [
        { name: "Ventas", value: 1200 }
      ]
    }
  ];
};
