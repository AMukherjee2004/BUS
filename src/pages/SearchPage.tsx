import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Bus, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import RouteCard from '../components/dashboard/RouteCard';
import SearchBar from '../components/ui/SearchBar';
import { useAuth } from '../context/AuthContext';
import { busRoutes, busStops } from '../data/mockData';
import { BusRoute, BusStop } from '../types';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    routes: BusRoute[],
    stops: BusStop[]
  }>({
    routes: [],
    stops: []
  });

  useEffect(() => {
    document.title = 'Search Results - KolkataBus';
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    
    // Search for bus routes
    const matchedRoutes = busRoutes.filter(route => 
      route.busNumber.toLowerCase().includes(normalizedQuery) ||
      route.name.toLowerCase().includes(normalizedQuery)
    );
    
    // Search for bus stops
    const matchedStops = busStops.filter(stop => 
      stop.name.toLowerCase().includes(normalizedQuery)
    );
    
    setSearchResults({
      routes: matchedRoutes,
      stops: matchedStops
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Search Results
          </h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search bus routes, stops, or areas..."
            className="max-w-2xl"
          />
        </div>

        {searchQuery && (
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            Showing results for: <span className="font-medium">{searchQuery}</span>
          </div>
        )}

        {/* Bus Routes Results */}
        {searchResults.routes.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Bus Routes ({searchResults.routes.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.routes.map((route) => {
                // Get first and last stops for display
                const firstStopId = route.stops[0];
                const lastStopId = route.stops[route.stops.length - 1];
                const firstStop = busStops.find(s => s.id === firstStopId)?.name || '';
                const lastStop = busStops.find(s => s.id === lastStopId)?.name || '';
                
                return (
                  <RouteCard
                    key={route.id}
                    route={route}
                    departureStop={firstStop}
                    arrivalStop={lastStop}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Bus Stops Results */}
        {searchResults.stops.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Bus Stops ({searchResults.stops.length})
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.stops.map((stop) => (
                <div 
                  key={stop.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center"
                >
                  <Bus size={18} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{stop.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {busStops.find(s => s.areaId === stop.areaId)?.name || stop.areaId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchResults.routes.length === 0 && searchResults.stops.length === 0 && searchQuery && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any bus routes or stops matching "{searchQuery}". 
              Try using different keywords or check the spelling.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;