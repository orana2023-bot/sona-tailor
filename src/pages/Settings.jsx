import React from 'react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Company Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-gray-700">Company Name</label><input type="text" defaultValue="SONA TAILORS" className="mt-1 block w-full p-2 border rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Tagline</label><input type="text" defaultValue="A UNIQUE WOMAN" className="mt-1 block w-full p-2 border rounded-md" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Address</label><textarea defaultValue="36/38, Ramcharan Sett Road,&#10;RamrajaTala, Howrah - 711104" className="mt-1 block w-full p-2 border rounded-md h-24" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Phone</label><input type="text" className="mt-1 block w-full p-2 border rounded-md" /></div>
            <div><label className="block text-sm font-medium text-gray-700">GST Number</label><input type="text" className="mt-1 block w-full p-2 border rounded-md" /></div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
