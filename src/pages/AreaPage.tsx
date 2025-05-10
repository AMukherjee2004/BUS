import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ChevronRight, Bus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import BusStopSelector from '../components/dashboard/BusStopSelector';
import RouteCard from '../components/dashboard/RouteCard';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { areas, busStops, findRoutes, getStopsByArea } from '../data/mockData';
import { BusRoute, BusStop } from '../types';

const AreaPage: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const { isAuthenticated } = useAuth();
  const [area, setArea] = useState(areas.find(a => a.id === areaId));
  const [stops, setStops] = useState<BusStop[]>([]);
  const [departureStop, setDepartureStop] = useState<string | null>(null);
  const [arrivalStop, setArrivalStop] = useState<string | null>(null);
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    if (areaId) {
      const currentArea = areas.find(a => a.id === areaId);
      setArea(currentArea);
      
      if (currentArea) {
        document.title = `${currentArea.name} Bus Routes - KolkataBus`;
        const areaStops = getStopsByArea(currentArea.id);
        setStops(areaStops);
      }
    }
  }, [areaId]);

  useEffect(() => {
    // Reset selections when area changes
    setDepartureStop(null);
    setArrivalStop(null);
    setRoutes([]);
    setIsSearched(false);
  }, [areaId]);

  const handleSearch = () => {
    if (departureStop && arrivalStop) {
      const foundRoutes = findRoutes(departureStop, arrivalStop);
      setRoutes(foundRoutes);
      setIsSearched(true);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!area) {
    return <Navigate to="/dashboard" replace />;
  }

  const getDepartureStopName = () => {
    return departureStop ? stops.find(s => s.id === departureStop)?.name || '' : '';
  };

  const getArrivalStopName = () => {
    return arrivalStop ? stops.find(s => s.id === arrivalStop)?.name || '' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bus Routes in {area.name}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Select Your Route
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your boarding and destination points to find available bus routes.
            </p>
          </div>

          <BusStopSelector
            stops={stops}
            selectedStop={departureStop}
            onSelectStop={setDepartureStop}
            label="Select Boarding Point"
          />

          <BusStopSelector
            stops={stops}
            selectedStop={arrivalStop}
            onSelectStop={setArrivalStop}
            label="Select Destination"
          />

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleSearch}
              disabled={!departureStop || !arrivalStop || departureStop === arrivalStop}
              rightIcon={<ChevronRight size={18} />}
              size="lg"
            >
              Find Bus Routes
            </Button>
          </div>
        </div>

        {isSearched && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Available Routes from {getDepartureStopName()} to {getArrivalStopName()}
            </h2>

            {routes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    departureStop={getDepartureStopName()}
                    arrivalStop={getArrivalStopName()}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <Bus size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Direct Routes Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  There are no direct bus routes between these stops. Try selecting different stops or consider transfers.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AreaPage;