import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  username: string;
  photoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ username, photoUrl }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-neutral-800">Gestion Utilisateurs</h1>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-3 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200">
                {photoUrl ? (
                  <img 
                    src={photoUrl} 
                    alt={username} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="w-full h-full p-1 text-neutral-500" />
                )}
              </div>
              <span className="font-medium text-neutral-700">{username}</span>
              <ChevronDown size={16} className="text-neutral-500" />
            </div>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animation-fade">
              <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center">
                <Settings size={16} className="mr-2" />
                Settings
              </a>
              <button 
                className="w-full text-left block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 flex items-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;