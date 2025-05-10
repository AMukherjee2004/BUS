import React from 'react';
import { MapPin } from 'lucide-react';
import { BusStop } from '../../types';

interface BusStopSelectorProps {
  stops: BusStop[];
  selectedStop: string | null;
  onSelectStop: (stopId: string) => void;
  label: string;
}

const BusStopSelector: React.FC<BusStopSelectorProps> = ({
  stops,
  selectedStop,
  onSelectStop,
  label
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stops.map((stop) => (
          <button
            key={stop.id}
            onClick={() => onSelectStop(stop.id)}
            className={`flex items-center p-3 rounded-lg border transition-all ${
              selectedStop === stop.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
            }`}
          >
            <MapPin
              size={18}
              className={selectedStop === stop.id ? 'text-blue-600' : 'text-gray-500'}
            />
            <span className="ml-2 text-gray-800 dark:text-gray-200">{stop.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusStopSelector;