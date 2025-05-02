
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Filter } from "lucide-react";

// Sample data for the charts
const monthlyIncomeData = [
  { name: "Ene", value: 15000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 17500 },
  { name: "Abr", value: 15000 },
  { name: "May", value: 18500 },
];

// Sample data for the income table
const incomeData = [
  { id: 1, description: "Salario", category: "Empleo", amount: 15000, date: "2025-05-01" },
  { id: 2, description: "Freelance - Diseño", category: "Freelance", amount: 3500, date: "2025-04-25" },
  { id: 3, description: "Dividendos", category: "Inversiones", amount: 850, date: "2025-04-20" },
  { id: 4, description: "Venta de artículos", category: "Otros", amount: 1200, date: "2025-04-18" },
];

const IncomeTab = () => {
  const [timeFilter, setTimeFilter] = useState("year");
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
              <SelectItem value="salary">Empleo</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="investments">Inversiones</SelectItem>
              <SelectItem value="other">Otros</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        
        <Button className="bg-success hover:bg-success/90">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo ingreso
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
          <ChartContainer className="h-80" config={{
            value: { color: "#4ade80" }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']}
                  labelFormatter={(label) => `Mes: ${label}`}
                />
                <Legend />
                <Bar name="Ingresos" dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Historial de ingresos</h3>
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
                {incomeData.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>{income.category}</TableCell>
                    <TableCell>${income.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Resumen del mes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total de ingresos</p>
                <p className="text-2xl font-bold text-success">$19,350</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comparado con el mes pasado</p>
                <p className="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-success mr-1"><path d="m18 8-6-6-6 6"/><path d="M18 22H6a2 2 0 0 1-2-2V8"/></svg>
                  +10.5%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeTab;
