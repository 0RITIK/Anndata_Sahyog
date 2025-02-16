import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { RefreshCw } from 'lucide-react';

// Mock data - Replace with actual API calls
const seasonalData = {
  kharif: [
    { crop: 'Rice', cost: 1800, msp: 2200, difference: 400 },
    { crop: 'Maize', cost: 1500, msp: 1900, difference: 400 },
    { crop: 'Soybean', cost: 3200, msp: 4000, difference: 800 },
  ],
  rabi: [
    { crop: 'Wheat', cost: 1600, msp: 2100, difference: 500 },
    { crop: 'Barley', cost: 1400, msp: 1800, difference: 400 },
    { crop: 'Mustard', cost: 4000, msp: 5000, difference: 1000 },
  ],
};

const marketPriceData = [
  { state: 'Punjab', rice: 2200, wheat: 2100, maize: 1900 },
  { state: 'Haryana', rice: 2150, wheat: 2050, maize: 1850 },
  { state: 'UP', rice: 2100, wheat: 2000, maize: 1800 },
];

const trendData = Array.from({ length: 12 }, (_, i) => ({
  date: format(new Date(2024, i, 1), 'MMM yyyy'),
  rice: 2000 + Math.random() * 500,
  wheat: 1900 + Math.random() * 400,
  maize: 1700 + Math.random() * 300,
}));

const productionData = [
  { state: 'Punjab', area: 4000, production: 12000 },
  { state: 'Haryana', area: 3500, production: 10500 },
  { state: 'UP', area: 5000, production: 15000 },
];

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="h-[400px]">
      {children}
    </div>
  </div>
);

function PricePredictions() {
  const [season, setSeason] = useState('kharif');
  const [state, setState] = useState('Punjab');
  const [commodity, setCommodity] = useState('rice');
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Price Predictions</h1>
        <button
          onClick={refreshData}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Season-wise Crop Prices */}
        <ChartCard title="Season-wise Crop Prices">
          <div className="mb-4">
            <Select
              label="Select Season"
              value={season}
              onChange={setSeason}
              options={[
                { value: 'kharif', label: 'Kharif' },
                { value: 'rabi', label: 'Rabi' },
              ]}
            />
          </div>
          <ResponsiveContainer>
            <BarChart data={seasonalData[season as keyof typeof seasonalData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="#047857" name="Production Cost" />
              <Bar dataKey="msp" fill="#059669" name="MSP" />
              <Bar dataKey="difference" fill="#10B981" name="Difference" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Market Price Comparison */}
        <ChartCard title="Market Price Comparison">
          <div className="mb-4">
            <Select
              label="Select Commodity"
              value={commodity}
              onChange={setCommodity}
              options={[
                { value: 'rice', label: 'Rice' },
                { value: 'wheat', label: 'Wheat' },
                { value: 'maize', label: 'Maize' },
              ]}
            />
          </div>
          <ResponsiveContainer>
            <BarChart data={marketPriceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={commodity} fill="#059669" name={commodity.charAt(0).toUpperCase() + commodity.slice(1)} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Price Trends Over Time */}
        <ChartCard title="Price Trends Over Time">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rice" stroke="#047857" name="Rice" />
              <Line type="monotone" dataKey="wheat" stroke="#059669" name="Wheat" />
              <Line type="monotone" dataKey="maize" stroke="#10B981" name="Maize" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Area vs Production Analysis */}
        <ChartCard title="Area vs Production Analysis">
          <div className="mb-4">
            <Select
              label="Select State"
              value={state}
              onChange={setState}
              options={[
                { value: 'Punjab', label: 'Punjab' },
                { value: 'Haryana', label: 'Haryana' },
                { value: 'UP', label: 'Uttar Pradesh' },
              ]}
            />
          </div>
          <ResponsiveContainer>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="area" fill="#047857" name="Area (Hectares)" />
              <Bar dataKey="production" fill="#059669" name="Production (Tonnes)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

export default PricePredictions;