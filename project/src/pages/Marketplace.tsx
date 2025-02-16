import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Camera, Building2, IndianRupee, Truck, AlertCircle } from 'lucide-react';

// Mock data - Replace with actual API calls
const crops = [
  { id: 1, name: 'Rice', msp: 2000 },
  { id: 2, name: 'Wheat', msp: 2015 },
  { id: 3, name: 'Maize', msp: 1870 },
  { id: 4, name: 'Soybean', msp: 3950 },
];

const states = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh'];
const districts = ['District 1', 'District 2', 'District 3'];
const seasons = ['Kharif', 'Rabi'];
const varieties = ['Grade A', 'Grade B', 'Grade C'];
const paymentMethods = ['UPI', 'Bank Transfer', 'Cash'];

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const NumberInput: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}> = ({ label, value, onChange, min = 0 }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="number"
      min={min}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    />
  </div>
);

function Marketplace() {
  const [userType, setUserType] = useState<'buyer-seller' | 'government' | null>(null);
  const [action, setAction] = useState<'buy' | 'sell' | null>(null);
  const [sellType, setSellType] = useState<'msp' | 'market' | 'custom' | null>(null);
  const [buyType, setBuyType] = useState<'farmers' | 'market' | null>(null);

  // Form states
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on user type and action
    console.log('Form submitted');
  };

  const renderUserTypeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => setUserType('buyer-seller')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <ShoppingBag className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Buyer/Seller</span>
      </button>
      <button
        onClick={() => setUserType('government')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <Building2 className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Government Representative</span>
      </button>
    </div>
  );

  const renderActionSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => setAction('buy')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <ShoppingCart className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Buy</span>
      </button>
      <button
        onClick={() => setAction('sell')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <IndianRupee className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Sell</span>
      </button>
    </div>
  );

  const renderSellTypeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => setSellType('msp')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <Building2 className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Sell at MSP</span>
      </button>
      <button
        onClick={() => setSellType('market')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <ShoppingBag className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Sell at Market Price</span>
      </button>
      <button
        onClick={() => setSellType('custom')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <Camera className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Custom Post</span>
      </button>
    </div>
  );

  const renderBuyTypeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => setBuyType('farmers')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <Truck className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Buy from Farmers' Posts</span>
      </button>
      <button
        onClick={() => setBuyType('market')}
        className="flex items-center justify-center space-x-2 p-6 border-2 border-green-500 rounded-lg hover:bg-green-50"
      >
        <ShoppingCart className="h-6 w-6 text-green-600" />
        <span className="text-lg font-medium">Buy at Market Price</span>
      </button>
    </div>
  );

  const renderMSPForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Crop"
        value={selectedCrop}
        onChange={setSelectedCrop}
        options={crops.map(crop => crop.name)}
      />
      <Select
        label="Season"
        value={selectedSeason}
        onChange={setSelectedSeason}
        options={seasons}
      />
      <NumberInput
        label="Quantity (in quintals)"
        value={quantity}
        onChange={setQuantity}
      />
      <Select
        label="Payment Method"
        value={selectedPayment}
        onChange={setSelectedPayment}
        options={paymentMethods}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
      >
        Submit
      </button>
    </form>
  );

  const renderMarketPriceForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="State"
        value={selectedState}
        onChange={setSelectedState}
        options={states}
      />
      <Select
        label="District"
        value={selectedDistrict}
        onChange={setSelectedDistrict}
        options={districts}
      />
      <Select
        label="Crop"
        value={selectedCrop}
        onChange={setSelectedCrop}
        options={crops.map(crop => crop.name)}
      />
      <Select
        label="Variety"
        value={selectedVariety}
        onChange={setSelectedVariety}
        options={varieties}
      />
      <NumberInput
        label="Quantity (in quintals)"
        value={quantity}
        onChange={setQuantity}
      />
      <NumberInput
        label="Price per quintal"
        value={price}
        onChange={setPrice}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
      >
        Submit
      </button>
    </form>
  );

  const renderCustomPostForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Crop Photo</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                <span>Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <Select
        label="Crop"
        value={selectedCrop}
        onChange={setSelectedCrop}
        options={crops.map(crop => crop.name)}
      />
      <Select
        label="Season"
        value={selectedSeason}
        onChange={setSelectedSeason}
        options={seasons}
      />
      <NumberInput
        label="Quantity (in quintals)"
        value={quantity}
        onChange={setQuantity}
      />
      <NumberInput
        label="Price per quintal"
        value={price}
        onChange={setPrice}
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
      >
        Submit
      </button>
    </form>
  );

  const renderContent = () => {
    if (!userType) {
      return renderUserTypeSelection();
    }

    if (!action) {
      return renderActionSelection();
    }

    if (action === 'sell') {
      if (!sellType) {
        return renderSellTypeSelection();
      }

      switch (sellType) {
        case 'msp':
          return renderMSPForm();
        case 'market':
          return renderMarketPriceForm();
        case 'custom':
          return renderCustomPostForm();
      }
    }

    if (action === 'buy') {
      if (!buyType) {
        return renderBuyTypeSelection();
      }

      switch (buyType) {
        case 'farmers':
          return (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-700">
                  Farmers' posts will be displayed here once available.
                </p>
              </div>
            </div>
          );
        case 'market':
          return renderMarketPriceForm();
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <div className="flex items-center space-x-2">
          {userType && (
            <button
              onClick={() => {
                setUserType(null);
                setAction(null);
                setSellType(null);
                setBuyType(null);
              }}
              className="text-green-600 hover:text-green-500"
            >
              ← Start Over
            </button>
          )}
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

export default Marketplace;