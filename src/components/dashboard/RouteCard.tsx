import React from 'react';
import { Bus, Clock, Calendar } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { BusRoute, BusSchedule } from '../../types';

interface RouteCardProps {
  route: BusRoute;
  departureStop: string;
  arrivalStop: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, departureStop, arrivalStop }) => {
  // Find the next schedule based on current time
  const getCurrentSchedule = (): BusSchedule | null => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Filter schedules for today
    const todaySchedules = route.schedule.filter(schedule => 
      schedule.daysOperational.includes(day)
    );
    
    if (todaySchedules.length === 0) return null;
    
    // Sort by departure time
    return todaySchedules[0];
  };

  const currentSchedule = getCurrentSchedule();

  return (
    <Card className="h-full border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
      <CardHeader className="bg-blue-50 dark:bg-gray-750">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <Bus size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bus {route.busNumber}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{route.name}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 my-1"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{departureStop}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Departure</p>
              </div>
              <div className="mt-8">
                <p className="font-medium text-gray-900 dark:text-white">{arrivalStop}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Arrival</p>
              </div>
            </div>
          </div>

          {currentSchedule && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <Clock size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {currentSchedule.departureTime} - {currentSchedule.arrivalTime}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {currentSchedule.frequency}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteCard;