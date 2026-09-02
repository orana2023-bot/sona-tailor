import React from 'react';
import { DataTable } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

function Ledger() {
  const [ledger] = useLocalStorage('ledger', []);
  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Reference', accessor: 'reference' },
    { header: 'Description', accessor: 'description' },
    { header: 'Debit', render: row => row.debit > 0 ? `₹${row.debit}` : '-' },
    { header: 'Credit', render: row => row.credit > 0 ? `₹${row.credit}` : '-' },
    { header: 'Balance', render: row => `₹${row.balance}` }
  ];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100"><DataTable columns={columns} data={ledger} /></div>;
}

export default function Accounts() {
  const location = useLocation();
  const getTabClass = (path) => {
    const isMatch = path === '' ? location.pathname === '/accounts' || location.pathname === '/accounts/' : location.pathname.includes(path);
    return `py-2 px-4 border-b-2 font-medium text-sm ${isMatch ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Accounts & Ledger</h2>

      <div className="flex space-x-4 border-b border-gray-200">
        <Link to="/accounts" className={getTabClass('')}>General Ledger</Link>
        <Link to="/accounts/profit-loss" className={getTabClass('profit-loss')}>Profit & Loss</Link>
      </div>

      <Routes>
        <Route path="/" element={<Ledger />} />
        <Route path="/profit-loss" element={<div className="p-8 text-center text-gray-500 text-lg">Profit & Loss Report (Under Construction)</div>} />
      </Routes>
    </div>
  );
}
