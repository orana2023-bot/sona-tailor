import React, { useState } from 'react';
import { useLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

export default function OrderBooking() {
  const [orders, setOrders] = useLocalStorage('orders', []);
  const [customers, setCustomers] = useLocalStorage('customers', []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ name: '', workType: '', qty: 1, rate: 0 }],
    makingCharge: 0,
    otherCharge: 0,
    advance: 0,
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => setFormData({ ...formData, items: [...formData.items, { name: '', workType: '', qty: 1, rate: 0 }] });

  const subtotal = formData.items.reduce((acc, curr) => acc + (Number(curr.qty) * Number(curr.rate)), 0);
  const grandTotal = subtotal + Number(formData.makingCharge) + Number(formData.otherCharge);
  const due = grandTotal - Number(formData.advance);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ST-${10000 + orders.length + 1}`,
      ...formData,
      amount: grandTotal,
      due: due,
      productionStatus: 'New',
      paymentStatus: due > 0 ? (formData.advance > 0 ? 'Partial' : 'Pending') : 'Paid',
    };
    setOrders([...orders, newOrder]);
    
    // Add new customer if it doesn't exist
    if (!customers.find(c => c.phone === formData.phone)) {
      setCustomers([...customers, { id: `C${customers.length + 1}`, name: formData.customerName, phone: formData.phone }]);
    }
    
    alert(`Order ${newOrder.id} booked successfully!`);
    navigate('/orders');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">New Order Booking</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Customer Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Search or new..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
              <input type="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.deliveryDate} onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-medium text-gray-900">Garment Items</h3>
            <button type="button" onClick={addItem} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-100">Add Item</button>
          </div>
          
          <div className="space-y-4">
            {formData.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50 p-4 rounded-lg">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700">Item / Garment Type</label>
                  <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} placeholder="e.g. Blouse" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Work Type</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={item.workType} onChange={e => handleItemChange(idx, 'workType', e.target.value)}>
                    <option value="">Select</option>
                    <option value="Stitching">Stitching</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Ari">Ari</option>
                    <option value="Finishing">Finishing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Qty</label>
                  <input type="number" min="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Rate</label>
                  <input type="number" min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={item.rate} onChange={e => handleItemChange(idx, 'rate', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Making Charge</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.makingCharge} onChange={e => setFormData({...formData, makingCharge: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Other Charge</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.otherCharge} onChange={e => setFormData({...formData, otherCharge: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Advance Paid</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" value={formData.advance} onChange={e => setFormData({...formData, advance: e.target.value})} />
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Making & Other:</span><span>₹{Number(formData.makingCharge) + Number(formData.otherCharge)}</span></div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200"><span>Grand Total:</span><span>₹{grandTotal}</span></div>
              <div className="flex justify-between text-sm text-green-600 font-medium"><span>Advance:</span><span>-₹{formData.advance}</span></div>
              <div className="flex justify-between text-xl font-bold text-red-600 pt-2 border-t border-gray-200"><span>Due Amount:</span><span>₹{due}</span></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate('/orders')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Save & Print Order</button>
        </div>
      </form>
    </div>
  );
}
