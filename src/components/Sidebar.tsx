import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FileDown,
  User,
  UserPlus
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-neutral-800">UserAdmin</h2>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-3">
          Main Menu
        </p>
        
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <LayoutDashboard size={18} className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/users" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <Users size={18} className="mr-3" />
              Users
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/form" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <ClipboardList size={18} className="mr-3" />
              User Form
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/export" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <FileDown size={18} className="mr-3" />
              Export Data
            </NavLink>
          </li>
        </ul>
        
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-8 mb-3 px-3">
          User Management
        </p>
        
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/users" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <Users size={18} className="mr-3" />
              View All Users
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/form" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <UserPlus size={18} className="mr-3" />
              Add New User
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="px-6 py-4 mt-auto border-t border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="text-xs text-neutral-500">
            <p>Laravel + React</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;