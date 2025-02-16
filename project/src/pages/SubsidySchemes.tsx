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
import { RefreshCw, AlertCircle } from 'lucide-react';

// Mock data - Replace with actual API calls
const subsidyRatesData = [
  { year: '2021', nitrogen: 18.789, phosphorus: 45.323, potassium: 10.116 },
  { year: '2022', nitrogen: 20.112, phosphorus: 48.567, potassium: 11.234 },
  { year: '2023', nitrogen: 22.456, phosphorus: 50.789, potassium: 12.567 },
];

const pkvyFundData = {
  '2021': [
    { state: 'Maharashtra', allocation: 450 },
    { state: 'Karnataka', allocation: 380 },
    { state: 'Gujarat', allocation: 320 },
    { state: 'Punjab', allocation: 290 },
    { state: 'Madhya Pradesh', allocation: 270 },
  ],
  '2022': [
    { state: 'Maharashtra', allocation: 480 },
    { state: 'Karnataka', allocation: 400 },
    { state: 'Gujarat', allocation: 350 },
    { state: 'Punjab', allocation: 310 },
    { state: 'Madhya Pradesh', allocation: 290 },
  ],
  '2023': [
    { state: 'Maharashtra', allocation: 520 },
    { state: 'Karnataka', allocation: 430 },
    { state: 'Gujarat', allocation: 380 },
    { state: 'Punjab', allocation: 340 },
    { state: 'Madhya Pradesh', allocation: 320 },
  ],
  '2024': [
    { state: 'Maharashtra', allocation: 550 },
    { state: 'Karnataka', allocation: 460 },
    { state: 'Gujarat', allocation: 410 },
    { state: 'Punjab', allocation: 370 },
    { state: 'Madhya Pradesh', allocation: 350 },
  ],
  '2025': [
    { state: 'Maharashtra', allocation: 580 },
    { state: 'Karnataka', allocation: 490 },
    { state: 'Gujarat', allocation: 440 },
    { state: 'Punjab', allocation: 400 },
    { state: 'Madhya Pradesh', allocation: 380 },
  ],
};

const centralSchemesData = {
  'Maharashtra': [
    { year: '2019', allocation: 1200 },
    { year: '2020', allocation: 1350 },
    { year: '2021', allocation: 1500 },
    { year: '2022', allocation: 1650 },
    { year: '2023', allocation: 1800 },
    { year: '2024', allocation: 2000 },
  ],
  'Karnataka': [
    { year: '2019', allocation: 1000 },
    { year: '2020', allocation: 1150 },
    { year: '2021', allocation: 1300 },
    { year: '2022', allocation: 1450 },
    { year: '2023', allocation: 1600 },
    { year: '2024', allocation: 1800 },
  ],
  // Add more states as needed
};

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

function SubsidySchemes() {
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedState, setSelectedState] = useState('Maharashtra');

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
        <h1 className="text-3xl font-bold">Subsidy & Schemes</h1>
        <button
          onClick={refreshData}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-700">
            More features coming soon! Currently showing statistical data only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nutrient-Based Subsidy Rates */}
        <ChartCard title="Nutrient-Based Subsidy Rates (2021-2023)">
          <ResponsiveContainer>
            <LineChart data={subsidyRatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="nitrogen" stroke="#047857" name="Nitrogen" />
              <Line type="monotone" dataKey="phosphorus" stroke="#059669" name="Phosphorus" />
              <Line type="monotone" dataKey="potassium" stroke="#10B981" name="Potassium" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* State-wise Fund Allocation for PKVY */}
        <ChartCard title="State-wise Fund Allocation for PKVY">
          <div className="mb-4">
            <Select
              label="Select Year"
              value={selectedYear}
              onChange={setSelectedYear}
              options={[
                { value: '2021', label: '2021' },
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
              ]}
            />
          </div>
          <ResponsiveContainer>
            <BarChart data={pkvyFundData[selectedYear as keyof typeof pkvyFundData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocation" fill="#059669" name="Fund Allocation (Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Fund Allocation for Central Schemes */}
        <ChartCard title="Fund Allocation for Central Schemes (2019-2024)">
          <div className="mb-4">
            <Select
              label="Select State"
              value={selectedState}
              onChange={setSelectedState}
              options={[
                { value: 'Maharashtra', label: 'Maharashtra' },
                { value: 'Karnataka', label: 'Karnataka' },
              ]}
            />
          </div>
          <ResponsiveContainer>
            <LineChart data={centralSchemesData[selectedState as keyof typeof centralSchemesData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="allocation" stroke="#059669" name="Fund Allocation (Cr)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

export default SubsidySchemes;