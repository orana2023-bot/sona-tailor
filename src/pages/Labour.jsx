import React, { useState } from 'react';
import { DataTable } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

function LabourEntries() {
  const [entries] = useLocalStorage('labourEntries', []);
  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Order No', accessor: 'orderNo' },
    { header: 'Labour', accessor: 'labourName' },
    { header: 'Work', accessor: 'workType' },
    { header: 'Item', accessor: 'item' },
    { header: 'Qty', accessor: 'qty' },
    { header: 'Rate', render: row => `₹${row.rate}` },
    { header: 'Amount', render: row => `₹${row.amount}` },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
       <DataTable columns={columns} data={entries} />
    </div>
  );
}

export default function Labour() {
  const location = useLocation();
  const isPayments = location.pathname.includes('payments');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Labour Management</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700">Add Entry</button>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <Link to="/labour" className={`py-2 px-4 border-b-2 font-medium text-sm ${!isPayments ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Work Entries</Link>
        <Link to="/labour/payments" className={`py-2 px-4 border-b-2 font-medium text-sm ${isPayments ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Payments</Link>
      </div>

      <Routes>
        <Route path="/" element={<LabourEntries />} />
        <Route path="/payments" element={<div className="p-8 text-center text-gray-500">Payments Module UI</div>} />
      </Routes>
    </div>
  );
}
