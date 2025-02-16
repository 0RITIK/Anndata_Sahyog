import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingCart, TrendingUp, Building2, Truck, LogIn } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <span className="font-bold text-xl">Ann-daata Sahyogya</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/marketplace" className="flex items-center space-x-1 hover:text-green-200">
              <ShoppingCart className="h-5 w-5" />
              <span>Marketplace</span>
            </Link>
            <Link to="/price-predictions" className="flex items-center space-x-1 hover:text-green-200">
              <TrendingUp className="h-5 w-5" />
              <span>Price Predictions</span>
            </Link>
            <Link to="/subsidy-schemes" className="flex items-center space-x-1 hover:text-green-200">
              <Building2 className="h-5 w-5" />
              <span>Subsidy & Schemes</span>
            </Link>
            <Link to="/delivery-tracking" className="flex items-center space-x-1 hover:text-green-200">
              <Truck className="h-5 w-5" />
              <span>Delivery Tracking</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar