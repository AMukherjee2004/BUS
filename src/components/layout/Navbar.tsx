import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, Bus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import SearchBar from '../ui/SearchBar';
import HelpModal from '../ui/HelpModal';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // In a real app, this would navigate to search results
    console.log('Searching for:', query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-lg"
            >
              <Bus size={24} />
              <span>KolkataBus</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user && (
              <div className="w-64">
                <SearchBar onSearch={handleSearch} placeholder="Search bus routes..." />
              </div>
            )}
            
            <HelpModal className="ml-2" />

            <Button
              variant="ghost"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              leftIcon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>

            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300">Hi, {user.name || user.username}</span>
                <Button variant="outline" onClick={handleLogout} leftIcon={<LogOut size={18} />}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/login')}>Login</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && (
              <div className="px-3 py-2">
                <SearchBar onSearch={handleSearch} placeholder="Search bus routes..." />
              </div>
            )}
            
            <div className="flex items-center px-3 py-2">
              <HelpModal />
            </div>
            
            <div className="flex items-center justify-between px-3 py-2">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                leftIcon={theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            
            {user ? (
              <>
                <div className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  Hi, {user.name || user.username}
                </div>
                <div className="px-3 py-2">
                  <Button variant="outline" onClick={handleLogout} fullWidth leftIcon={<LogOut size={18} />}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-3 py-2">
                <Button onClick={() => navigate('/login')} fullWidth>
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;