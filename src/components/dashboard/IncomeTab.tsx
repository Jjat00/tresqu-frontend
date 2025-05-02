
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Filter, Download, Share2 } from "lucide-react";

// Define income data for different time periods
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
  ]
};

// Sample data for the income table
const allIncomeData = [
  { id: 1, description: "Salario", category: "Empleo", subcategory: "Salario base", amount: 15000, date: "2025-05-01" },
  { id: 2, description: "Freelance - Diseño", category: "Freelance", subcategory: "Diseño gráfico", amount: 3500, date: "2025-04-25" },
  { id: 3, description: "Dividendos", category: "Inversiones", subcategory: "Acciones", amount: 850, date: "2025-04-20" },
  { id: 4, description: "Venta de artículos", category: "Otros", subcategory: "Ventas", amount: 1200, date: "2025-04-18" },
  { id: 5, description: "Bonificación", category: "Empleo", subcategory: "Bonos", amount: 2000, date: "2025-04-15" },
  { id: 6, description: "Freelance - Desarrollo", category: "Freelance", subcategory: "Programación", amount: 4200, date: "2025-04-10" },
  { id: 7, description: "Intereses", category: "Inversiones", subcategory: "Depósitos", amount: 320, date: "2025-04-05" },
];

// Income breakdown by category
const incomeByCategory = [
  { category: "Empleo", amount: 17000 },
  { category: "Freelance", amount: 7700 },
  { category: "Inversiones", amount: 1170 },
  { category: "Otros", amount: 1200 },
];

const IncomeTab = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [chartData, setChartData] = useState(incomeDataByPeriod.month);
  const [filteredIncome, setFilteredIncome] = useState(allIncomeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [newIncomeOpen, setNewIncomeOpen] = useState(false);
  const [newIncome, setNewIncome] = useState({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    recurring: false
  });

  // Apply filters in real-time
  useEffect(() => {
    let filtered = [...allIncomeData];
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(income => 
        income.category.toLowerCase() === categoryFilter.replace("salary", "empleo")
          .replace("freelance", "freelance")
          .replace("investments", "inversiones")
          .replace("other", "otros")
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(income => 
        income.description.toLowerCase().includes(query) || 
        income.category.toLowerCase().includes(query) ||
        income.subcategory.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredIncome(filtered);
  }, [categoryFilter, searchQuery]);

  // Update chart data when time filter changes
  useEffect(() => {
    setChartData(incomeDataByPeriod[timeFilter as keyof typeof incomeDataByPeriod]);
  }, [timeFilter]);

  const handleAddIncome = () => {
    console.log("Adding new income:", newIncome);
    // Here you would add logic to add the income
    setNewIncomeOpen(false);
    setNewIncome({
      description: "",
      category: "",
      subcategory: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      recurring: false
    });
  };

  const handleExportPDF = () => {
    console.log("Exporting income data to PDF");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    console.log("Exporting income data to Excel");
    // Implementation would go here
  };

  const handleShare = () => {
    console.log("Sharing CashBot");
    // Implementation would go here
  };

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
        
        <Dialog open={newIncomeOpen} onOpenChange={setNewIncomeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo ingreso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo ingreso</DialogTitle>
              <DialogDescription>
                Ingresa los detalles del nuevo ingreso
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm">Descripción</label>
                <Input
                  id="description"
                  value={newIncome.description}
                  onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: Salario mensual"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-sm">Categoría</label>
                <Select 
                  value={newIncome.category} 
                  onValueChange={(value) => setNewIncome({...newIncome, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empleo">Empleo</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="inversiones">Inversiones</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newIncome.category && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subcategory" className="text-right text-sm">Subcategoría</label>
                  <Input
                    id="subcategory"
                    value={newIncome.subcategory}
                    onChange={(e) => setNewIncome({...newIncome, subcategory: e.target.value})}
                    className="col-span-3"
                    placeholder="Ej: Salario base"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm">Monto</label>
                <Input
                  id="amount"
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                  className="col-span-3"
                  type="number"
                  placeholder="$0.00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm">Fecha</label>
                <Input
                  id="date"
                  value={newIncome.date}
                  onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                  className="col-span-3"
                  type="date"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Recurrente</label>
                <div className="flex items-center space-x-2 col-span-3">
                  <input 
                    type="checkbox" 
                    id="recurring" 
                    checked={newIncome.recurring}
                    onChange={(e) => setNewIncome({...newIncome, recurring: e.target.checked})}
                    className="rounded border-gray-300" 
                  />
                  <label htmlFor="recurring" className="text-sm">Es un ingreso recurrente mensual</label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewIncomeOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddIncome}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
          <ChartContainer className="h-80" config={{
            value: { color: "#4ade80" }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']}
                  labelFormatter={(label) => `Período: ${label}`}
                />
                <Legend />
                <Bar name="Ingresos" dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Ingresos por Categoría</h3>
            <div className="space-y-4">
              {incomeByCategory.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm">{item.category}</div>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success"
                      style={{ 
                        width: `${(item.amount / incomeByCategory.reduce((sum, i) => sum + i.amount, 0)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium w-24 text-right">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total de ingresos</span>
                  <span className="text-lg font-bold">
                    ${incomeByCategory.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ingreso mensual promedio (últimos 6 meses)</p>
                <p className="text-2xl font-bold">$17,500</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ingresos vs. mes anterior</p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-success">+$3,500</p>
                  <p className="text-sm text-success">+23.3%</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Proyección próximo mes</p>
                <p className="text-xl font-semibold">$19,200</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <h3 className="text-lg font-semibold">Historial de ingresos</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Input
                  type="search"
                  placeholder="Buscar ingresos..."
                  className="w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportExcel}>
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Subcategoría</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncome.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell>{income.description}</TableCell>
                    <TableCell>{income.category}</TableCell>
                    <TableCell>{income.subcategory}</TableCell>
                    <TableCell>${income.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total: <span className="font-semibold">${filteredIncome.reduce((sum, income) => sum + income.amount, 0).toLocaleString()}</span>
              </p>
            </div>
            
            <div className="flex sm:hidden gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir CashBot
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeTab;
