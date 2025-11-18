import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <main className="w-full p-0">
        <Outlet />
      </main>
    </div>
  );
}