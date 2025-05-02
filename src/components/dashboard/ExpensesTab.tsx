
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { Plus, Search, Filter } from "lucide-react";

// Sample data for the charts
const categoryData = [
  { name: "Alimentación", value: 2500, color: "#4ade80" },
  { name: "Transporte", value: 1500, color: "#60a5fa" },
  { name: "Entretenimiento", value: 1800, color: "#f472b6" },
  { name: "Servicios", value: 900, color: "#a78bfa" },
  { name: "Otros", value: 700, color: "#fbbf24" },
];

const monthlyData = [
  { name: "Semana 1", value: 1200 },
  { name: "Semana 2", value: 1900 },
  { name: "Semana 3", value: 2100 },
  { name: "Semana 4", value: 1800 },
];

// Sample data for the expenses table
const expensesData = [
  { id: 1, description: "Supermercado", category: "Alimentación", amount: 850, date: "2025-05-01" },
  { id: 2, description: "Gasolina", category: "Transporte", amount: 500, date: "2025-05-01" },
  { id: 3, description: "Netflix", category: "Entretenimiento", amount: 180, date: "2025-04-29" },
  { id: 4, description: "Restaurante", category: "Alimentación", amount: 650, date: "2025-04-28" },
  { id: 5, description: "Electricidad", category: "Servicios", amount: 450, date: "2025-04-25" },
  { id: 6, description: "Uber", category: "Transporte", amount: 200, date: "2025-04-24" },
];

const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#a78bfa", "#fbbf24"];

const ExpensesTab = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="food">Alimentación</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="entertainment">Entretenimiento</SelectItem>
              <SelectItem value="services">Servicios</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        
        <Button className="bg-success hover:bg-success/90">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo gasto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Gastos por Categoría</h3>
            <ChartContainer className="h-80" config={{
              ...Object.fromEntries(
                categoryData.map(({ name, color }) => [name, { color }])
              )
            }}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Gastos Semanales</h3>
            <ChartContainer className="h-80" config={{
              value: { color: "#4ade80" }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Últimos gastos</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar gastos..."
                className="pl-8 h-9 w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expensesData.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesTab;
