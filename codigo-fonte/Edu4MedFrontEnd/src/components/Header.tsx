import React, { useRef } from 'react';
import { Bell, User, LogOut, BookmarkCheck, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationPopup from './NotificationPopup';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleNotifications, notifications } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate to home page even if there's an error
      navigate('/');
    }
  };

  return (
    <header className="bg-[#00B4D8] p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          edu<span className="text-[#0077B6]">4MED</span>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link 
                to="/editais" 
                className="text-white hover:text-[#0077B6] transition-colors"
              >
                Editais
              </Link>
              <Link 
                to="/meus-editais" 
                className="text-white hover:text-[#0077B6] transition-colors flex items-center gap-1"
              >
                <BookmarkCheck className="w-5 h-5" />
                Meus Editais
              </Link>
              {user.roles === 'Admin' && (
                <Link 
                  to="/admin" 
                  className="text-white hover:text-[#0077B6] transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              )}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={toggleNotifications}
                  className="relative text-white"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <NotificationPopup />
              </div>
              <Link to="/profile">
                <User className="text-white w-6 h-6 cursor-pointer" />
              </Link>
              <button 
                onClick={handleLogout}
                className="hover:text-[#0077B6] transition-colors"
              >
                <LogOut className="text-white w-6 h-6 cursor-pointer" />
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/editais" 
                className="text-white hover:text-[#0077B6] transition-colors"
              >
                Editais
              </Link>
              <Link 
                to="/login" 
                className="text-white hover:text-[#0077B6] transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-[#00B4D8] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}