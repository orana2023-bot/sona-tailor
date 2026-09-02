import React from 'react';
import { useLocalStorage } from '../utils/localStorage';
import { Clock, User } from 'lucide-react';

const stages = ['New', 'Cutting', 'Stitching', 'Embroidery', 'Finishing', 'Ready', 'Delivered'];

export default function Production() {
  const [orders] = useLocalStorage('orders', []);

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Production Board</h2>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 min-w-max h-full pb-4">
          {stages.map(stage => {
            const stageOrders = orders.filter(o => o.productionStatus === stage || (stage === 'New' && !o.productionStatus));
            return (
              <div key={stage} className="w-80 bg-gray-100 rounded-lg flex flex-col h-full flex-shrink-0">
                <div className="p-3 bg-gray-200 rounded-t-lg border-b border-gray-300 font-medium text-gray-700 flex justify-between items-center">
                  {stage}
                  <span className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-full">{stageOrders.length}</span>
                </div>
                <div className="p-2 flex-1 overflow-y-auto space-y-2">
                  {stageOrders.map(order => (
                    <div key={order.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-indigo-700 text-sm">{order.id}</span>
                        <span className="text-xs bg-red-100 text-red-800 px-1 rounded">{order.deliveryDate}</span>
                      </div>
                      <p className="text-sm text-gray-900 font-medium">{order.customerName}</p>
                      <p className="text-xs text-gray-500 mb-3">{order.items[0]?.name} - {order.items[0]?.workType}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="w-3 h-3 mr-1" /> Unassigned
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
