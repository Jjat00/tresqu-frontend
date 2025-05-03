
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { Plus, Search, Filter, Download, Share2, Calendar, ChartBar } from "lucide-react";
import SubcategoryView from "./SubcategoryView";
import { useIsMobile } from "@/hooks/use-mobile";

// Datos de meses
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Sample data for the charts with specific dates
const categoryData = [
  { name: "Alimentación", value: 2500, color: "#4ade80" },
  { name: "Transporte", value: 1500, color: "#60a5fa" },
  { name: "Entretenimiento", value: 1800, color: "#f472b6" },
  { name: "Servicios", value: 900, color: "#a78bfa" },
  { name: "Otros", value: 700, color: "#fbbf24" },
];

// Define weekly data with specific dates
const weeklyDataByMonth = {
  "Enero": [
    { name: "Lun 1 Ene", value: 1200 },
    { name: "Mar 2 Ene", value: 800 },
    { name: "Mié 3 Ene", value: 1500 },
    { name: "Jue 4 Ene", value: 900 },
    { name: "Vie 5 Ene", value: 1700 },
    { name: "Sáb 6 Ene", value: 2200 },
    { name: "Dom 7 Ene", value: 1300 },
  ],
  "Febrero": [
    { name: "Lun 5 Feb", value: 1400 },
    { name: "Mar 6 Feb", value: 900 },
    { name: "Mié 7 Feb", value: 1600 },
    { name: "Jue 8 Feb", value: 1200 },
    { name: "Vie 9 Feb", value: 1800 },
    { name: "Sáb 10 Feb", value: 2400 },
    { name: "Dom 11 Feb", value: 1500 },
  ],
  "Marzo": [
    { name: "Lun 4 Mar", value: 1300 },
    { name: "Mar 5 Mar", value: 1000 },
    { name: "Mié 6 Mar", value: 1700 },
    { name: "Jue 7 Mar", value: 1100 },
    { name: "Vie 8 Mar", value: 1900 },
    { name: "Sáb 9 Mar", value: 2500 },
    { name: "Dom 10 Mar", value: 1600 },
  ],
  "Abril": [
    { name: "Lun 1 Abr", value: 1500 },
    { name: "Mar 2 Abr", value: 1200 },
    { name: "Mié 3 Abr", value: 1800 },
    { name: "Jue 4 Abr", value: 1400 },
    { name: "Vie 5 Abr", value: 2000 },
    { name: "Sáb 6 Abr", value: 2600 },
    { name: "Dom 7 Abr", value: 1700 },
  ],
  "Mayo": [
    { name: "Lun 6 May", value: 1600 },
    { name: "Mar 7 May", value: 1300 },
    { name: "Mié 8 May", value: 1900 },
    { name: "Jue 9 May", value: 1500 },
    { name: "Vie 10 May", value: 2100 },
    { name: "Sáb 11 May", value: 2700 },
    { name: "Dom 12 May", value: 1800 },
  ],
};

// Datos anuales por mes
const yearlyData = [
  { name: "Ene", value: 7000 },
  { name: "Feb", value: 6500 },
  { name: "Mar", value: 8200 },
  { name: "Abr", value: 6700 },
  { name: "May", value: 7500 },
  { name: "Jun", value: 6900 },
  { name: "Jul", value: 7800 },
  { name: "Ago", value: 8500 },
  { name: "Sep", value: 7200 },
  { name: "Oct", value: 6800 },
  { name: "Nov", value: 7400 },
  { name: "Dic", value: 8900 },
];

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
  const isMobile = useIsMobile();
  const [selectedMonth, setSelectedMonth] = useState("Abril"); // Por defecto mostramos abril
  const [viewMode, setViewMode] = useState("month"); // "month" o "year"
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredExpenses, setFilteredExpenses] = useState(allExpensesData);
  const [chartData, setChartData] = useState(weeklyDataByMonth[selectedMonth as keyof typeof weeklyDataByMonth]);
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
    if (viewMode === "month") {
      setChartData(weeklyDataByMonth[selectedMonth as keyof typeof weeklyDataByMonth]);
    } else {
      setChartData(yearlyData);
    }
  }, [selectedMonth, viewMode]);

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

  // Si un mes está seleccionado, mostramos los datos semanales de ese mes
  // Si "year" está seleccionado, mostramos los datos anuales
  const currentChartTitle = viewMode === "month" 
    ? `Gastos Semanales - ${selectedMonth}` 
    : "Gastos Anuales";

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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          {/* Barra de selección de meses */}
          <div className="mb-3 overflow-x-auto scrollbar-hide">
            <Tabs 
              defaultValue={selectedMonth} 
              onValueChange={(value) => {
                if (value === "year") {
                  setViewMode("year");
                } else {
                  setViewMode("month");
                  setSelectedMonth(value);
                }
              }}
              className="w-auto"
            >
              <TabsList className="w-max py-1 px-0.5 h-auto">
                {months.map((month) => (
                  <TabsTrigger
                    key={month}
                    value={month}
                    className="px-3 py-1.5 text-xs sm:text-sm"
                  >
                    {month}
                  </TabsTrigger>
                ))}
                <TabsTrigger
                  value="year"
                  className="px-3 py-1.5 text-xs sm:text-sm"
                >
                  Ver todo el año
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[120px] sm:w-[150px] text-xs sm:text-sm h-9">
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
            
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
        </div>
        
        <Dialog open={newExpenseOpen} onOpenChange={setNewExpenseOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90 h-9 whitespace-nowrap text-xs sm:text-sm">
              <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Nuevo gasto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6 overflow-hidden">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Gastos por Categoría</h3>
            <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
              ...Object.fromEntries(
                categoryData.map(({ name, color }) => [name, { color }])
              )
            }}>
              <PieChart margin={isMobile ? { top: 5, right: 5, bottom: 5, left: 5 } : { top: 20, right: 30, left: 20, bottom: 5 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 50 : 80}
                  outerRadius={isMobile ? 70 : 110}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`
                  }
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
          <CardContent className="pt-4 sm:pt-6 overflow-hidden">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">{currentChartTitle}</h3>
            <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
              value: { color: "#4ade80" }
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  margin={
                    isMobile 
                      ? { top: 10, right: 0, left: -20, bottom: 0 }
                      : { top: 20, right: 30, left: 20, bottom: 5 }
                  }
                  barSize={isMobile ? 12 : 20}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: isMobile ? 8 : 12 }}
                    interval={isMobile ? 1 : 0}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 30}
                  />
                  <YAxis 
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                    width={isMobile ? 35 : 50}
                    tickFormatter={(value) => 
                      value >= 1000 ? `${Math.floor(value/1000)}k` : value
                    }
                  />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
                  <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold">Últimos gastos</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar gastos..."
                  className="pl-8 h-9 w-full sm:w-[250px] text-xs sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPDF} className="h-9 text-xs">
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportExcel} className="h-9 text-xs">
                  <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Descripción</TableHead>
                  <TableHead className="text-xs">Categoría</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow 
                    key={expense.id} 
                    className="cursor-pointer hover:bg-muted/50 text-xs sm:text-sm"
                    onClick={() => setSelectedCategory(expense.category)}
                  >
                    <TableCell className="py-2">{expense.description}</TableCell>
                    <TableCell className="py-2">{expense.category}</TableCell>
                    <TableCell className="py-2">${expense.amount.toLocaleString()}</TableCell>
                    <TableCell className="py-2">{new Date(expense.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Total: <span className="font-semibold">${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}</span>
              </p>
            </div>
            
            <div className="flex sm:hidden gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF} className="h-8 text-xs">
                <Download className="mr-1 h-3 w-3" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel} className="h-8 text-xs">
                <Download className="mr-1 h-3 w-3" />
                Excel
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto h-8 sm:h-9 text-xs">
              <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Compartir CashBot
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesTab;
