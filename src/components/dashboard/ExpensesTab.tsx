
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Plus, Search, Filter, Download, Share2 } from "lucide-react";
import SubcategoryView from "./SubcategoryView";

// Sample data for the charts
const categoryData = [
  { name: "Alimentación", value: 2500, color: "#4ade80" },
  { name: "Transporte", value: 1500, color: "#60a5fa" },
  { name: "Entretenimiento", value: 1800, color: "#f472b6" },
  { name: "Servicios", value: 900, color: "#a78bfa" },
  { name: "Otros", value: 700, color: "#fbbf24" },
];

// Define weekly data for each month
const weeklyData = {
  month: [
    { name: "Semana 1", value: 1200 },
    { name: "Semana 2", value: 1900 },
    { name: "Semana 3", value: 2100 },
    { name: "Semana 4", value: 1800 },
  ],
  quarter: [
    { name: "Enero", value: 7000 },
    { name: "Febrero", value: 6500 },
    { name: "Marzo", value: 8200 },
  ],
  year: [
    { name: "Q1", value: 21700 },
    { name: "Q2", value: 18900 },
    { name: "Q3", value: 23500 },
    { name: "Q4", value: 25300 },
  ]
};

// Sample data for the expenses table
const allExpensesData = [
  { id: 1, description: "Supermercado", category: "Alimentación", amount: 850, date: "2025-05-01" },
  { id: 2, description: "Gasolina", category: "Transporte", amount: 500, date: "2025-05-01" },
  { id: 3, description: "Netflix", category: "Entretenimiento", amount: 180, date: "2025-04-29" },
  { id: 4, description: "Restaurante", category: "Alimentación", amount: 650, date: "2025-04-28" },
  { id: 5, description: "Electricidad", category: "Servicios", amount: 450, date: "2025-04-25" },
  { id: 6, description: "Uber", category: "Transporte", amount: 200, date: "2025-04-24" },
  { id: 7, description: "Amazon Prime", category: "Entretenimiento", amount: 120, date: "2025-04-22" },
  { id: 8, description: "Agua", category: "Servicios", amount: 300, date: "2025-04-20" },
  { id: 9, description: "Restaurante", category: "Alimentación", amount: 450, date: "2025-04-18" },
  { id: 10, description: "Metro", category: "Transporte", amount: 150, date: "2025-04-15" },
];

const ExpensesTab = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredExpenses, setFilteredExpenses] = useState(allExpensesData);
  const [chartData, setChartData] = useState(weeklyData.month);
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split('T')[0]
  });

  // Apply filters in real-time
  useEffect(() => {
    let filtered = [...allExpensesData];
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(expense => 
        expense.category.toLowerCase() === categoryFilter.replace("food", "alimentación")
          .replace("transport", "transporte")
          .replace("entertainment", "entretenimiento")
          .replace("services", "servicios")
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(query) || 
        expense.category.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredExpenses(filtered);
  }, [categoryFilter, searchQuery]);

  // Update chart data when time filter changes
  useEffect(() => {
    setChartData(weeklyData[timeFilter as keyof typeof weeklyData]);
  }, [timeFilter]);

  const handleAddExpense = () => {
    console.log("Adding new expense:", newExpense);
    // Here you would add logic to add the expense
    setNewExpenseOpen(false);
    setNewExpense({
      description: "",
      category: "",
      subcategory: "",
      amount: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleExportPDF = () => {
    console.log("Exporting expenses to PDF");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    console.log("Exporting expenses to Excel");
    // Implementation would go here
  };

  const handleShare = () => {
    console.log("Sharing CashBot");
    // Implementation would go here
  };

  // If a category is selected, show the subcategory view
  if (selectedCategory) {
    return (
      <SubcategoryView 
        category={selectedCategory} 
        onBack={() => setSelectedCategory(null)} 
      />
    );
  }

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
        
        <Dialog open={newExpenseOpen} onOpenChange={setNewExpenseOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo gasto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo gasto</DialogTitle>
              <DialogDescription>
                Ingresa los detalles del nuevo gasto
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm">Descripción</label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: Compra en supermercado"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-sm">Categoría</label>
                <Select 
                  value={newExpense.category} 
                  onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacion">Alimentación</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="entretenimiento">Entretenimiento</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newExpense.category && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subcategory" className="text-right text-sm">Subcategoría</label>
                  <Input
                    id="subcategory"
                    value={newExpense.subcategory}
                    onChange={(e) => setNewExpense({...newExpense, subcategory: e.target.value})}
                    className="col-span-3"
                    placeholder="Ej: Supermercado"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm">Monto</label>
                <Input
                  id="amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="col-span-3"
                  type="number"
                  placeholder="$0.00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm">Fecha</label>
                <Input
                  id="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  className="col-span-3"
                  type="date"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewExpenseOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddExpense}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  onClick={(data) => setSelectedCategory(data.name)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card p-3 rounded shadow border">
                        <p className="text-sm font-semibold">{payload[0].name}</p>
                        <p className="text-xs">${payload[0].value.toLocaleString()}</p>
                        <p className="text-xs text-success mt-1">Click para ver subcategorías</p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {timeFilter === "month" ? "Gastos Semanales" : 
               timeFilter === "quarter" ? "Gastos Mensuales" : "Gastos Trimestrales"}
            </h3>
            <ChartContainer className="h-80" config={{
              value: { color: "#4ade80" }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
                  <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <h3 className="text-lg font-semibold">Últimos gastos</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar gastos..."
                  className="pl-8 h-9 w-full sm:w-[250px]"
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
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow 
                    key={expense.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedCategory(expense.category)}
                  >
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total: <span className="font-semibold">${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}</span>
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

export default ExpensesTab;
