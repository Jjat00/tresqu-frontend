import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Plus, ArrowLeft, Download, Save } from "lucide-react";
interface SubcategoryViewProps {
  category: string;
  onBack: () => void;
}

// Sample subcategory data
const subcategoriesData = {
  "Transporte": [{
    name: "Uber",
    value: 850,
    color: "#4ade80"
  }, {
    name: "Taxi",
    value: 350,
    color: "#60a5fa"
  }, {
    name: "Bus",
    value: 200,
    color: "#f472b6"
  }, {
    name: "Metro",
    value: 100,
    color: "#a78bfa"
  }],
  "Alimentación": [{
    name: "Supermercado",
    value: 1200,
    color: "#4ade80"
  }, {
    name: "Restaurantes",
    value: 800,
    color: "#60a5fa"
  }, {
    name: "Comida a domicilio",
    value: 400,
    color: "#f472b6"
  }, {
    name: "Snacks",
    value: 100,
    color: "#a78bfa"
  }],
  "Entretenimiento": [{
    name: "Streaming",
    value: 800,
    color: "#4ade80"
  }, {
    name: "Cine",
    value: 600,
    color: "#60a5fa"
  }, {
    name: "Conciertos",
    value: 300,
    color: "#f472b6"
  }, {
    name: "Videojuegos",
    value: 100,
    color: "#a78bfa"
  }]
};

// Sample transactions data
const transactionsData = [{
  id: 1,
  description: "Uber al trabajo",
  subcategory: "Uber",
  amount: 250,
  date: "2025-05-01"
}, {
  id: 2,
  description: "Uber de regreso",
  subcategory: "Uber",
  amount: 270,
  date: "2025-05-01"
}, {
  id: 3,
  description: "Taxi al aeropuerto",
  subcategory: "Taxi",
  amount: 350,
  date: "2025-04-29"
}, {
  id: 4,
  description: "Bus línea 50",
  subcategory: "Bus",
  amount: 35,
  date: "2025-04-28"
}, {
  id: 5,
  description: "Metro ida y vuelta",
  subcategory: "Metro",
  amount: 50,
  date: "2025-04-27"
}, {
  id: 6,
  description: "Uber a restaurante",
  subcategory: "Uber",
  amount: 180,
  date: "2025-04-25"
}, {
  id: 7,
  description: "Bus línea 42",
  subcategory: "Bus",
  amount: 35,
  date: "2025-04-24"
}, {
  id: 8,
  description: "Metro ida y vuelta",
  subcategory: "Metro",
  amount: 50,
  date: "2025-04-23"
}];

// Monthly data by subcategory
const monthlySubcategoryData = [{
  name: "Semana 1",
  Uber: 420,
  Taxi: 150,
  Bus: 70,
  Metro: 30
}, {
  name: "Semana 2",
  Uber: 180,
  Taxi: 0,
  Bus: 35,
  Metro: 25
}, {
  name: "Semana 3",
  Uber: 250,
  Taxi: 200,
  Bus: 35,
  Metro: 25
}, {
  name: "Semana 4",
  Uber: 0,
  Taxi: 0,
  Bus: 60,
  Metro: 20
}];
const SubcategoryView = ({
  category,
  onBack
}: SubcategoryViewProps) => {
  const [newSubcategoryOpen, setNewSubcategoryOpen] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("");
  const subcategories = subcategoriesData[category as keyof typeof subcategoriesData] || [];
  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      console.log(`Adding new subcategory "${newSubcategory}" to ${category}`);
      // Here you would add the logic to add the subcategory to your data
      setNewSubcategoryOpen(false);
      setNewSubcategory("");
    }
  };
  const exportToPDF = () => {
    console.log(`Exporting ${category} subcategories to PDF`);
    // Implementation would go here
  };
  const exportToExcel = () => {
    console.log(`Exporting ${category} subcategories to Excel`);
    // Implementation would go here
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" onClick={onBack} className="sm:w-auto w-full justify-start mx-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a {category}
        </Button>

        <div className="flex gap-2">
          <Dialog open={newSubcategoryOpen} onOpenChange={setNewSubcategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Nueva subcategoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear subcategoría</DialogTitle>
                <DialogDescription>
                  Agrega una nueva subcategoría para {category}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input placeholder="Nombre de subcategoría" value={newSubcategory} onChange={e => setNewSubcategory(e.target.value)} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewSubcategoryOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddSubcategory}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="bg-success hover:bg-success/90 hidden sm:flex">
            <Save className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Distribución de {category} por Subcategoría</h3>
            <ChartContainer className="h-80" config={{
            ...Object.fromEntries(subcategories.map(({
              name,
              color
            }) => [name, {
              color
            }]))
          }}>
              <PieChart>
                <Pie data={subcategories} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value" nameKey="name" label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {subcategories.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={value => [`$${value.toLocaleString()}`, 'Monto']} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">{category} Semanal por Subcategoría</h3>
            <ChartContainer className="h-80" config={{
            ...Object.fromEntries(subcategories.map(({
              name,
              color
            }) => [name, {
              color
            }]))
          }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySubcategoryData} margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={value => [`$${value.toLocaleString()}`, 'Monto']} />
                  {subcategories.map(subcategory => <Bar key={subcategory.name} dataKey={subcategory.name} stackId="a" fill={subcategory.color} />)}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Movimientos por subcategoría</h3>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Subcategoría</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsData.map(transaction => <TableRow key={transaction.id}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.subcategory}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={exportToPDF}>
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Exportar Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default SubcategoryView;