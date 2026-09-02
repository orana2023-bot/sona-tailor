import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeData } from './utils/localStorage';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import OrderBooking from './pages/OrderBooking';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Measurements from './pages/Measurements';
import Production from './pages/Production';
import Labour from './pages/Labour';
import Employees from './pages/Employees';
import Accounts from './pages/Accounts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders/new" element={<OrderBooking />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="measurements" element={<Measurements />} />
          <Route path="production" element={<Production />} />
          <Route path="labour/*" element={<Labour />} />
          <Route path="employees/*" element={<Employees />} />
          <Route path="accounts/*" element={<Accounts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
