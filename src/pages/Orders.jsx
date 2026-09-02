import React from 'react';
import { DataTable, StatusBadge } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders] = useLocalStorage('orders', []);
  const navigate = useNavigate();

  const columns = [
    { header: 'Order No', accessor: 'id' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Order Date', accessor: 'date' },
    { header: 'Delivery Date', accessor: 'deliveryDate' },
    { header: 'Amount', render: (row) => `₹${row.amount}` },
    { header: 'Due', render: (row) => <span className={row.due > 0 ? "text-red-600 font-medium" : "text-green-600"}>₹{row.due}</span> },
    { header: 'Production', render: (row) => <StatusBadge status={row.productionStatus} /> },
    { header: 'Payment', render: (row) => <StatusBadge status={row.paymentStatus} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <button onClick={() => navigate('/orders/new')} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          New Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <input type="text" placeholder="Search orders..." className="p-2 border rounded-md text-sm w-64" />
          <select className="p-2 border rounded-md text-sm">
            <option>All Status</option>
            <option>New</option>
            <option>In Progress</option>
            <option>Ready</option>
            <option>Delivered</option>
          </select>
        </div>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
