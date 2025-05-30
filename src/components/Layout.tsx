import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header username={user?.name || 'User'} photoUrl={user?.photo_url} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;