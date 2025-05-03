
// Sample data for the charts with specific dates
export const categoryData = [
  { name: "Alimentación", value: 2500, color: "#4ade80" },
  { name: "Transporte", value: 1500, color: "#60a5fa" },
  { name: "Entretenimiento", value: 1800, color: "#f472b6" },
  { name: "Servicios", value: 900, color: "#a78bfa" },
  { name: "Otros", value: 700, color: "#fbbf24" },
];

// Define weekly data with specific dates
export const weeklyDataByMonth = {
  "Enero": [
    { name: "Lun 1 Ene", value: 1200 },
    { name: "Lun 8 Ene", value: 800 },
    { name: "Lun 15 Ene", value: 1500 },
    { name: "Lun 22 Ene", value: 900 },
    { name: "Lun 29 Ene", value: 1700 },
  ],
  "Febrero": [
    { name: "Lun 5 Feb", value: 1400 },
    { name: "Lun 12 Feb", value: 900 },
    { name: "Lun 19 Feb", value: 1600 },
    { name: "Lun 26 Feb", value: 1200 },
  ],
  "Marzo": [
    { name: "Lun 4 Mar", value: 1300 },
    { name: "Lun 11 Mar", value: 1000 },
    { name: "Lun 18 Mar", value: 1700 },
    { name: "Lun 25 Mar", value: 1100 },
  ],
  "Abril": [
    { name: "Lun 1 Abr", value: 1500 },
    { name: "Lun 8 Abr", value: 1200 },
    { name: "Lun 15 Abr", value: 1800 },
    { name: "Lun 22 Abr", value: 1400 },
    { name: "Lun 29 Abr", value: 2000 },
  ],
  "Mayo": [
    { name: "Lun 6 May", value: 1600 },
    { name: "Lun 13 May", value: 1300 },
    { name: "Lun 20 May", value: 1900 },
    { name: "Lun 27 May", value: 1500 },
  ],
};

// Datos anuales por mes
export const yearlyData = [
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

// Sample data for daily expenses for different weeks
export const dailyExpensesByWeek = {
  "Lun 1 Abr": [
    { 
      name: "Lun 1", 
      food: 200, 
      transport: 150, 
      entertainment: 0, 
      services: 0, 
      others: 50,
      total: 400 
    },
    { 
      name: "Mar 2", 
      food: 150, 
      transport: 100, 
      entertainment: 200, 
      services: 0, 
      others: 0,
      total: 450 
    },
    { 
      name: "Mié 3", 
      food: 180, 
      transport: 120, 
      entertainment: 0, 
      services: 300, 
      others: 100,
      total: 700 
    },
    { 
      name: "Jue 4", 
      food: 220, 
      transport: 100, 
      entertainment: 0, 
      services: 0, 
      others: 80,
      total: 400 
    },
    { 
      name: "Vie 5", 
      food: 300, 
      transport: 150, 
      entertainment: 250, 
      services: 0, 
      others: 0,
      total: 700 
    },
    { 
      name: "Sáb 6", 
      food: 350, 
      transport: 0, 
      entertainment: 400, 
      services: 0, 
      others: 150,
      total: 900 
    },
    { 
      name: "Dom 7", 
      food: 250, 
      transport: 0, 
      entertainment: 300, 
      services: 0, 
      others: 50,
      total: 600 
    }
  ],
  "Lun 8 Abr": [
    { name: "Lun 8", food: 220, transport: 140, entertainment: 0, services: 0, others: 40, total: 400 },
    { name: "Mar 9", food: 170, transport: 110, entertainment: 180, services: 0, others: 0, total: 460 },
    { name: "Mié 10", food: 190, transport: 130, entertainment: 0, services: 280, others: 90, total: 690 },
    { name: "Jue 11", food: 210, transport: 90, entertainment: 0, services: 0, others: 70, total: 370 },
    { name: "Vie 12", food: 320, transport: 160, entertainment: 230, services: 0, others: 0, total: 710 },
    { name: "Sáb 13", food: 330, transport: 0, entertainment: 380, services: 0, others: 160, total: 870 },
    { name: "Dom 14", food: 240, transport: 0, entertainment: 320, services: 0, others: 60, total: 620 }
  ],
  // Add more weeks as needed...
};

// Sample data for the expenses table
export const allExpensesData = [
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

// Datos de meses
export const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
