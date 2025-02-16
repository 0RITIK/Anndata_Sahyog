import React, { useState } from 'react';
import { Search, Package, Truck, MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

// Mock data - Replace with actual API calls
const mockDeliveries = [
  {
    id: 'DEL123456',
    type: 'delivery',
    status: 'in_transit',
    origin: 'Punjab',
    destination: 'Maharashtra',
    product: 'Wheat',
    quantity: '100 quintals',
    date: '2024-03-15',
    time: '14:30',
    currentLocation: 'Madhya Pradesh',
    estimatedDelivery: '2024-03-17',
    updates: [
      { timestamp: '2024-03-15 14:30', location: 'Punjab', status: 'Picked up' },
      { timestamp: '2024-03-15 18:45', location: 'Haryana', status: 'In transit' },
      { timestamp: '2024-03-16 09:15', location: 'Madhya Pradesh', status: 'In transit' },
    ],
  },
  {
    id: 'PIC789012',
    type: 'pickup',
    status: 'completed',
    origin: 'Gujarat',
    destination: 'Rajasthan',
    product: 'Rice',
    quantity: '75 quintals',
    date: '2024-03-10',
    time: '09:00',
    currentLocation: 'Rajasthan',
    estimatedDelivery: '2024-03-12',
    updates: [
      { timestamp: '2024-03-10 09:00', location: 'Gujarat', status: 'Scheduled' },
      { timestamp: '2024-03-11 10:30', location: 'Gujarat', status: 'In transit' },
      { timestamp: '2024-03-12 11:45', location: 'Rajasthan', status: 'Delivered' },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_transit':
      return 'bg-blue-100 text-blue-800';
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    case 'in_transit':
      return <Truck className="h-5 w-5 text-blue-600" />;
    case 'scheduled':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-600" />;
  }
};

function DeliveryTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeDelivery, setActiveDelivery] = useState<typeof mockDeliveries[0] | null>(null);
  const [searchError, setSearchError] = useState('');

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const delivery = mockDeliveries.find(d => d.id === trackingNumber);
    if (delivery) {
      setActiveDelivery(delivery);
      setSearchError('');
    } else {
      setActiveDelivery(null);
      setSearchError('No delivery found with this tracking number');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Delivery Tracking</h1>

      {/* Tracking Number Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleTrackingSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Tracking Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="e.g., DEL123456"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <Package className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 flex items-center justify-center space-x-2 h-10 mt-6"
          >
            <Search className="h-5 w-5" />
            <span>Track</span>
          </button>
        </form>
        {searchError && (
          <p className="mt-2 text-red-600 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {searchError}
          </p>
        )}
      </div>

      {/* Active Delivery Details */}
      {activeDelivery && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Tracking Details</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeDelivery.status)}`}>
              {activeDelivery.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Shipment Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Tracking Number</p>
                    <p className="text-gray-600">{activeDelivery.id}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Product Details</p>
                    <p className="text-gray-600">{activeDelivery.product} - {activeDelivery.quantity}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-gray-600">{activeDelivery.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Route Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Origin</p>
                    <p className="text-gray-600">{activeDelivery.origin}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-gray-600">{activeDelivery.destination}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-gray-600">{activeDelivery.currentLocation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Tracking Updates</h3>
            <div className="space-y-4">
              {activeDelivery.updates.map((update, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {getStatusIcon(update.status.toLowerCase())}
                  <div>
                    <p className="font-medium">{update.status}</p>
                    <p className="text-sm text-gray-600">{update.location}</p>
                    <p className="text-sm text-gray-500">{update.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delivery History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">Recent Deliveries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {delivery.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                      {delivery.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setTrackingNumber(delivery.id);
                        setActiveDelivery(delivery);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DeliveryTracking;