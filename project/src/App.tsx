import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import PricePredictions from './pages/PricePredictions';
import SubsidySchemes from './pages/SubsidySchemes';
import DeliveryTracking from './pages/DeliveryTracking';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/price-predictions" element={<PricePredictions />} />
            <Route path="/subsidy-schemes" element={<SubsidySchemes />} />
            <Route path="/delivery-tracking" element={<DeliveryTracking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;