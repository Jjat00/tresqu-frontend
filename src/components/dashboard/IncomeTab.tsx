import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Plus, Filter, Download, Share2, AlertCircle, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ComparativeLineChart from "./charts/ComparativeLineChart";
import IncomeLineChart from "./charts/IncomeLineChart";
import { DateRange } from "./DateRangePicker";
import { useIncomeCategoryData } from "@/hooks/useIncomeCategoryData";
import { useIncomeBarData } from "@/hooks/useIncomeBarData";
import { useIncomeSummary } from "@/hooks/useIncomeSummary";

interface IncomeTabProps {
  selectedMonth?: string;
  activeTab?: string;
  dateRange?: DateRange;
  viewMode?: "day" | "week" | "month" | "year";
}

// Sample data for the income table (mantener hasta que haya una API para esto)
const allIncomeData = [{
  id: 1,
  description: "Salario",
  category: "Empleo",
  subcategory: "Salario base",
  amount: 15000,
  date: "2025-05-01"
}, {
  id: 2,
  description: "Freelance - Diseño",
  category: "Freelance",
  subcategory: "Diseño gráfico",
  amount: 3500,
  date: "2025-04-25"
}, {
  id: 3,
  description: "Dividendos",
  category: "Inversiones",
  subcategory: "Acciones",
  amount: 850,
  date: "2025-04-20"
}, {
  id: 4,
  description: "Venta de artículos",
  category: "Otros",
  subcategory: "Ventas",
  amount: 1200,
  date: "2025-04-18"
}, {
  id: 5,
  description: "Bonificación",
  category: "Empleo",
  subcategory: "Bonos",
  amount: 2000,
  date: "2025-04-15"
}, {
  id: 6,
  description: "Freelance - Desarrollo",
  category: "Freelance",
  subcategory: "Programación",
  amount: 4200,
  date: "2025-04-10"
}, {
  id: 7,
  description: "Intereses",
  category: "Inversiones",
  subcategory: "Depósitos",
  amount: 320,
  date: "2025-04-05"
}];

const IncomeTab = ({
  selectedMonth = "Abril",
  activeTab = "income",
  dateRange,
  viewMode = "week"
}: IncomeTabProps) => {
  const isMobile = useIsMobile();
  const [timeFilter, setTimeFilter] = useState<"month" | "quarter" | "year">("month");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredIncome, setFilteredIncome] = useState(allIncomeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [newIncomeOpen, setNewIncomeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewModeLocal, setViewModeLocal] = useState<"day" | "week" | "month" | "year">(viewMode);
  const [localSelectedMonth, setLocalSelectedMonth] = useState(selectedMonth);
  const [newIncome, setNewIncome] = useState({
    description: "",
    category: "",
    subcategory: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    recurring: false
  });

  // Get income category data from API
  const { 
    data: categoryData, 
    isLoading: categoryLoading, 
    error: categoryError,
    total: categoryTotal
  } = useIncomeCategoryData(dateRange);
  
  // Get income bar chart data from API
  const { 
    data: barData, 
    isLoading: barLoading, 
    error: barError,
    total: barTotal
  } = useIncomeBarData(timeFilter, dateRange);

  // Get income summary data from API
  const { 
    data: summaryData, 
    isLoading: summaryLoading, 
    error: summaryError 
  } = useIncomeSummary();

  // Update localSelectedMonth when prop changes
  useEffect(() => {
    setLocalSelectedMonth(selectedMonth);
    // If year is selected, update view mode
    if (selectedMonth === "year") {
      setViewModeLocal("year");
    }
  }, [selectedMonth]);

  // Apply filters in real-time for the table data
  useEffect(() => {
    let filtered = [...allIncomeData];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(income => income.category.toLowerCase() === 
        categoryFilter.replace("salary", "empleo")
                     .replace("freelance", "freelance")
                     .replace("investments", "inversiones")
                     .replace("other", "otros"));
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

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  
  return <div className="space-y-3 md:space-y-6 sm:px-2 md:px-4 flex flex-col px-0 mx-0 my-[60px]">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-3">
        <div className="flex flex-wrap gap-2 w-full xs:w-auto">
          <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as "month" | "quarter" | "year")}>
            <SelectTrigger className="w-[120px] sm:w-[150px] text-xs sm:text-sm h-9">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[120px] sm:w-[150px] text-xs sm:text-sm h-9">
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
        </div>
        
        <Dialog open={newIncomeOpen} onOpenChange={setNewIncomeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success hover:bg-success/90 h-9 whitespace-nowrap text-xs sm:text-sm w-full xs:w-auto mt-2 xs:mt-0">
              <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Nuevo ingreso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Agregar nuevo ingreso</DialogTitle>
              <DialogDescription>
                Ingresa los detalles del nuevo ingreso
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm">Descripción</label>
                <Input id="description" value={newIncome.description} onChange={e => setNewIncome({
                ...newIncome,
                description: e.target.value
              })} className="col-span-3" placeholder="Ej: Salario mensual" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right text-sm">Categoría</label>
                <Select value={newIncome.category} onValueChange={value => setNewIncome({
                ...newIncome,
                category: value
              })}>
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
              {newIncome.category && <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subcategory" className="text-right text-sm">Subcategoría</label>
                  <Input id="subcategory" value={newIncome.subcategory} onChange={e => setNewIncome({
                ...newIncome,
                subcategory: e.target.value
              })} className="col-span-3" placeholder="Ej: Salario base" />
                </div>}
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm">Monto</label>
                <Input id="amount" value={newIncome.amount} onChange={e => setNewIncome({
                ...newIncome,
                amount: e.target.value
              })} className="col-span-3" type="number" placeholder="$0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm">Fecha</label>
                <Input id="date" value={newIncome.date} onChange={e => setNewIncome({
                ...newIncome,
                date: e.target.value
              })} className="col-span-3" type="date" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Recurrente</label>
                <div className="flex items-center space-x-2 col-span-3">
                  <input type="checkbox" id="recurring" checked={newIncome.recurring} onChange={e => setNewIncome({
                  ...newIncome,
                  recurring: e.target.checked
                })} className="rounded border-gray-300" />
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Gráfica de ingresos por categoría */}
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <Card className="overflow-hidden h-full flex flex-col">
            <CardContent className="pt-3 xs:pt-4 sm:pt-6 px-2 xs:px-3 sm:px-4 h-full flex flex-col grow">
              <h3 className="xs:text-base sm:text-lg mb-1 xs:mb-2 text-sm font-semibold text-center">
                Ingresos por Categoría
              </h3>
              <div className="flex-1 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
                {categoryLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
                  </div>
                ) : categoryError ? (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                    <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
                  </div>
                ) : categoryData.length === 0 ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
                  </div>
                ) : (
                  <ChartContainer className={`${isMobile ? 'h-60' : 'h-80'}`} config={{
                    ...Object.fromEntries(categoryData.map(({
                      category,
                      color
                    }) => [category, {
                      color
                    }]))
                  }}>
                    <PieChart margin={isMobile ? {
                      top: 5,
                      right: 5,
                      bottom: 5,
                      left: 5
                    } : {
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                      <Pie 
                        data={categoryData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={isMobile ? 30 : 60} 
                        outerRadius={isMobile ? 55 : 90} 
                        paddingAngle={2} 
                        dataKey="amount" 
                        nameKey="category" 
                        label={({
                          category,
                          percent
                        }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${category}: ${(percent * 100).toFixed(0)}%`} 
                        labelLine={false} 
                        onClick={data => setSelectedCategory(data.category)}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke={entry.color === "#4ade80" ? "#166534" : "#1e40af"} 
                            strokeWidth={1.5} 
                            style={{
                              cursor: 'pointer'
                            }} 
                          />
                        ))}
                      </Pie>
                      <Tooltip content={({
                        active,
                        payload
                      }) => {
                        if (active && payload && payload.length) {
                          const category = payload[0].name as string;
                          const selectedCategoryData = categoryData.find(item => item.category === category);
                          return (
                            <div className="bg-card p-3 rounded shadow border">
                              <p className="text-sm font-semibold">{payload[0].name}</p>
                              <p className="text-xs mb-2">{formatCurrency(payload[0].value as number)}</p>
                              
                              {selectedCategoryData && selectedCategoryData.subcategories && 
                                selectedCategoryData.subcategories.map((sub, i) => (
                                  <div key={i} className="flex justify-between text-xs mb-1">
                                    <span className="mr-4">{sub.name}:</span>
                                    <span>{formatCurrency(sub.value)}</span>
                                  </div>
                                ))
                              }
                            </div>
                          );
                        }
                        return null;
                      }} />
                    </PieChart>
                  </ChartContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Gráfica de ingresos mensuales */}
        <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
          <Card>
            <CardContent className="pt-3 xs:pt-4 sm:pt-6 xs:px-3 sm:px-4 overflow-hidden">
              <h3 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2">Ingresos {timeFilter === "month" ? "Mensuales" : timeFilter === "quarter" ? "Trimestrales" : "Anuales"}</h3>
              
              {barLoading ? (
                <div className="flex items-center justify-center h-[calc(100%-30px)]">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
                </div>
              ) : barError ? (
                <div className="flex flex-col items-center justify-center h-[calc(100%-30px)]">
                  <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                  <p className="text-sm text-muted-foreground">Error al cargar los datos</p>
                </div>
              ) : barData.length === 0 ? (
                <div className="flex items-center justify-center h-[calc(100%-30px)]">
                  <p className="text-sm text-muted-foreground">No hay datos disponibles</p>
                </div>
              ) : (
                <ChartContainer className={`h-[calc(100%-30px)]`} config={{
                  value: {
                    color: "#4ade80"
                  }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={barData} 
                      margin={isMobile ? {
                        top: 10,
                        right: 0,
                        left: -20,
                        bottom: 0
                      } : {
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }} 
                      barSize={isMobile ? 12 : 20}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{
                          fontSize: isMobile ? 10 : 12
                        }} 
                        interval={isMobile ? 1 : 0} 
                      />
                      <YAxis 
                        tick={{
                          fontSize: isMobile ? 10 : 12
                        }} 
                        width={isMobile ? 35 : 50} 
                        tickFormatter={value => value >= 1000 ? `${Math.floor(value / 1000)}k` : value} 
                      />
                      <Tooltip 
                        formatter={value => [formatCurrency(value as number), 'Monto']} 
                        labelFormatter={label => `Período: ${label}`} 
                      />
                      <Bar name="Ingresos" dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Gráfico de línea para ingresos */}
      <div className="h-[280px] xs:h-[320px] sm:h-[350px]">
        <IncomeLineChart viewMode={viewModeLocal} selectedMonth={localSelectedMonth} activeTab={activeTab || "income"} dateRange={dateRange} />
      </div>
      
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Estadísticas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {summaryLoading ? (
                <div className="col-span-3 flex items-center justify-center h-20">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">Cargando estadísticas...</span>
                </div>
              ) : summaryError ? (
                <div className="col-span-3 flex items-center justify-center h-20 text-destructive">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <span>Error al cargar estadísticas</span>
                </div>
              ) : summaryData ? (
                <>
                  <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Ingreso mensual promedio</p>
                    <p className="text-xl sm:text-2xl font-bold">{formatCurrency(summaryData.average_monthly)}</p>
                  </div>
                  
                  <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Ingresos vs. mes anterior</p>
                    <div className="flex items-end gap-2">
                      <p className={`text-xl sm:text-2xl font-bold ${summaryData.comparison_previous.amount >= 0 ? "text-success" : "text-destructive"}`}>
                        {summaryData.comparison_previous.amount >= 0 ? "+" : ""}
                        {formatCurrency(summaryData.comparison_previous.amount)}
                      </p>
                      <p className={`text-xs sm:text-sm ${summaryData.comparison_previous.amount >= 0 ? "text-success" : "text-destructive"}`}>
                        {summaryData.comparison_previous.amount >= 0 ? "+" : ""}
                        {summaryData.comparison_previous.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">Proyección próximo mes</p>
                    <p className="text-lg sm:text-xl font-semibold">{formatCurrency(summaryData.projection_next_month)}</p>
                  </div>
                </>
              ) : (
                <div className="col-span-3 flex items-center justify-center h-20">
                  <p className="text-sm text-muted-foreground">No hay datos estadísticos disponibles</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold">Historial de ingresos</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Input type="search" placeholder="Buscar ingresos..." className="w-full sm:w-[250px] h-9 text-xs sm:text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
                  <TableHead className="text-xs">Subcategoría</TableHead>
                  <TableHead className="text-xs">Monto</TableHead>
                  <TableHead className="text-xs">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncome.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No se encontraron ingresos con los filtros actuales
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncome.map(income => (
                    <TableRow key={income.id} className="text-xs sm:text-sm">
                      <TableCell className="py-2">{income.description}</TableCell>
                      <TableCell className="py-2">{income.category}</TableCell>
                      <TableCell className="py-2">{income.subcategory}</TableCell>
                      <TableCell className="py-2">{formatCurrency(income.amount)}</TableCell>
                      <TableCell className="py-2">{new Date(income.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-wrap justify-between items-center gap-2 mt-3 sm:mt-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Total: <span className="font-semibold">{formatCurrency(filteredIncome.reduce((sum, income) => sum + income.amount, 0))}</span>
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
    </div>;
};
export default IncomeTab;
