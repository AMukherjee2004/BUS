import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import AreaCard from '../components/dashboard/AreaCard';
import { useAuth } from '../context/AuthContext';
import { areas } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Update document title
    document.title = 'Dashboard - KolkataBus';
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name || user?.username}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Select an area to find bus routes in Kolkata
          </p>
        </div>

        <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-8">
          <Bus size={24} className="text-blue-600 mr-3" />
          <p className="text-gray-700 dark:text-gray-300">
            Find your bus by selecting an area, then choosing your boarding and destination points.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Select an Area
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;