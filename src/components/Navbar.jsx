import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {

  const {logout, user} = useAuthStore()

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">Prime Trade AI</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
