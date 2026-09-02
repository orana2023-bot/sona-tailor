import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export default function Reports() {
  const reports = [
    { name: 'Order Report', desc: 'Summary of all orders and their statuses' },
    { name: 'Sales Report', desc: 'Detailed sales and revenue metrics' },
    { name: 'Labour Report', desc: 'Labour work entries and payments' },
    { name: 'Customer Due Report', desc: 'Outstanding balances by customer' },
    { name: 'Profit & Loss Report', desc: 'Overall financial summary' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><FileText className="w-5 h-5" /></div>
                <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">{report.desc}</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Printer className="w-4 h-4 mr-2" /> Print
              </button>
              <button className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Download className="w-4 h-4 mr-2" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
