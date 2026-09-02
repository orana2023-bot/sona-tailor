import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Users, Ruler, Scissors, 
  UserCog, UserCheck, Wallet, Receipt, IndianRupee, 
  BarChart3, Settings, Menu, X, Bell, Search
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Order Booking', to: '/orders/new', icon: ShoppingBag },
  { name: 'Orders', to: '/orders', icon: ShoppingBag },
  { name: 'Customers', to: '/customers', icon: Users },
  { name: 'Measurements', to: '/measurements', icon: Ruler },
  { name: 'Production', to: '/production', icon: Scissors },
  { name: 'Labour', to: '/labour', icon: UserCog },
  { name: 'Employees', to: '/employees', icon: UserCheck },
  { name: 'Accounts', to: '/accounts', icon: Wallet },
  { name: 'Reports', to: '/reports', icon: BarChart3 },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const route = navigation.find(n => location.pathname.startsWith(n.to) && n.to !== '/');
    return route ? route.name : 'Sona Tailors';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-16 bg-indigo-950">
          <span className="text-xl font-bold uppercase tracking-wider">Sona Tailors</span>
        </div>
        <div className="px-4 py-2 text-xs text-indigo-300 text-center border-b border-indigo-800">
          A Unique Woman
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'}`}
            >
              <item.icon className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center flex-1">
            <button className="text-gray-500 focus:outline-none lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900 hidden sm:block">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Search className="h-4 w-4 text-gray-400"/></span>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search orders..." />
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main section */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
