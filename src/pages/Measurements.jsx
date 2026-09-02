import React, { useState } from 'react';
import { DataTable } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';

export default function Measurements() {
  const [measurements] = useLocalStorage('measurements', []);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const columns = [
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Date', accessor: 'date' },
    { header: 'Length', accessor: 'length' },
    { header: 'Chest', accessor: 'chest' },
    { header: 'Waist', accessor: 'waist' },
    { header: 'Shoulder', accessor: 'shoulder' },
    { header: 'Action', render: () => <button className="text-indigo-600 hover:text-indigo-900">View/Edit</button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Measurements</h2>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          New Measurement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100"><input type="text" placeholder="Search..." className="p-2 border rounded-md text-sm w-full" /></div>
           <DataTable columns={columns} data={measurements} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Measurement Form</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Length', 'H.B.L.', 'Chest', 'Waist', 'Shoulder', 'Sleeve', 'Muhuri', 'F. Neck', 'B.P.', 'B. Neck', 'Thigh', 'Armpit'].map(field => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-700">{field}</label>
                <input type="text" className="mt-1 block w-full p-2 border rounded-md text-sm" />
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-indigo-600 text-white p-2 rounded-md">Save Measurement</button>
        </div>
      </div>
    </div>
  );
}
