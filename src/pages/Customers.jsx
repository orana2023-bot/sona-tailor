import React, { useState } from 'react';
import { DataTable, Modal } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { Users, IndianRupee } from 'lucide-react';

export default function Customers() {
  const [customers] = useLocalStorage('customers', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Address', accessor: 'address' },
    { header: 'Total Orders', accessor: 'totalOrders' },
    { header: 'Total Amount', render: (row) => `₹${row.totalAmount || 0}` },
    { header: 'Due', render: (row) => <span className={row.due > 0 ? "text-red-600 font-medium" : "text-green-600"}>₹{row.due || 0}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input type="text" placeholder="Search customers by name or phone..." className="p-2 border rounded-md text-sm w-64" />
        </div>
        <DataTable columns={columns} data={customers} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" className="mt-1 block w-full p-2 border rounded-md" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Phone</label><input type="text" className="mt-1 block w-full p-2 border rounded-md" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Address</label><textarea className="mt-1 block w-full p-2 border rounded-md"></textarea></div>
          <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-indigo-600 text-white p-2 rounded-md">Save</button>
        </form>
      </Modal>
    </div>
  );
}
