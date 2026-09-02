import React from 'react';
import { StatCard, DataTable, StatusBadge } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { ShoppingBag, IndianRupee, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [orders] = useLocalStorage('orders', []);
  const [sales] = useLocalStorage('sales', []);
  const [attendance] = useLocalStorage('attendance', []);
  const navigate = useNavigate();

  const totalSales = sales.reduce((acc, curr) => acc + curr.total, 0);
  const totalDue = orders.reduce((acc, curr) => acc + curr.due, 0);
  const pendingOrders = orders.filter(o => o.productionStatus !== 'Delivered').length;

  const recentOrdersColumns = [
    { header: 'Order No', accessor: 'id' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Delivery Date', accessor: 'deliveryDate' },
    { header: 'Amount', render: (row) => `₹${row.amount}` },
    { header: 'Due', render: (row) => <span className="text-red-600">₹{row.due}</span> },
    { header: 'Status', render: (row) => <StatusBadge status={row.productionStatus} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Orders" value={orders.length} icon={ShoppingBag} colorClass="bg-indigo-500" />
        <StatCard title="Pending Orders" value={pendingOrders} icon={Clock} colorClass="bg-amber-500" />
        <StatCard title="Total Sales" value={`₹${totalSales}`} icon={IndianRupee} colorClass="bg-green-500" />
        <StatCard title="Total Due" value={`₹${totalDue}`} icon={TrendingUp} colorClass="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
            <button onClick={() => navigate('/orders')} className="text-sm text-indigo-600 font-medium hover:text-indigo-800">View All</button>
          </div>
          <DataTable columns={recentOrdersColumns} data={orders.slice(0, 5)} onRowClick={(row) => navigate(`/orders/${row.id}`)} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
          </div>
          <div className="p-4 space-y-4">
            {attendance.slice(0, 5).map((att, idx) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{att.employeeName}</p>
                  <p className="text-xs text-gray-500">{att.department}</p>
                </div>
                <StatusBadge status={att.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
