import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSupabaseData } from '@/contexts/SupabaseDataContext';
import { Wifi, WifiOff } from 'lucide-react';

export default function AdminLayout() {
  const { state } = useSupabaseData();
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Neatrix Admin</span>
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${state.realTimeConnected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {state.realTimeConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {state.realTimeConnected ? 'Live' : 'Offline'}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link to="/overview" className={`hover:underline ${location.pathname.endsWith('/overview') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}>Overview</Link>
            <Link to="/bookings" className="hover:underline text-gray-600 dark:text-gray-300">Bookings</Link>
            <Link to="/users" className="hover:underline text-gray-600 dark:text-gray-300">Users</Link>
            <Link to="/notifications" className="hover:underline text-gray-600 dark:text-gray-300">Notifications</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}