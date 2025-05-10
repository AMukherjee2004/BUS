import { Area, BusRoute, BusStop } from '../types';

export const areas: Area[] = [
  {
    id: 'behala',
    name: 'Behala',
    description: 'Southwest Kolkata area with multiple bus routes',
    image: 'https://images.pexels.com/photos/17258358/pexels-photo-17258358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'north',
    name: 'North Kolkata',
    description: 'Historical part of the city with colonial architecture',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'south',
    name: 'South Kolkata',
    description: 'Modern residential and commercial hub',
    image: 'https://images.pexels.com/photos/2223082/pexels-photo-2223082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'central',
    name: 'Central Kolkata',
    description: 'Business district and administrative center',
    image: 'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const busStops: BusStop[] = [
  // Behala stops
  { id: 'behala-chowrasta', name: 'Behala Chowrasta', areaId: 'behala' },
  { id: 'parnasree', name: 'Parnasree', areaId: 'behala' },
  { id: 'sakher-bazar', name: 'Sakher Bazar', areaId: 'behala' },
  { id: 'thakurpukur', name: 'Thakurpukur', areaId: 'behala' },
  { id: 'behala-tram-depot', name: 'Behala Tram Depot', areaId: 'behala' },
  
  // North Kolkata stops
  { id: 'shyambazar', name: 'Shyambazar', areaId: 'north' },
  { id: 'hatibagan', name: 'Hatibagan', areaId: 'north' },
  { id: 'sovabazar', name: 'Sovabazar', areaId: 'north' },
  { id: 'burrabazar', name: 'Burrabazar', areaId: 'north' },
  { id: 'college-street', name: 'College Street', areaId: 'north' },
  
  // South Kolkata stops
  { id: 'jadavpur', name: 'Jadavpur', areaId: 'south' },
  { id: 'dhakuria', name: 'Dhakuria', areaId: 'south' },
  { id: 'garia', name: 'Garia', areaId: 'south' },
  { id: 'tollygunge', name: 'Tollygunge', areaId: 'south' },
  { id: 'ballygunge', name: 'Ballygunge', areaId: 'south' },
  
  // Central Kolkata stops
  { id: 'esplanade', name: 'Esplanade', areaId: 'central' },
  { id: 'park-street', name: 'Park Street', areaId: 'central' },
  { id: 'dharmatala', name: 'Dharmatala', areaId: 'central' },
  { id: 'chandni-chowk', name: 'Chandni Chowk', areaId: 'central' },
  { id: 'bbdBag', name: 'BBD Bag', areaId: 'central' }
];

export const busRoutes: BusRoute[] = [
  {
    id: 'route-1',
    busNumber: '12C',
    name: 'Behala - Esplanade',
    stops: ['behala-chowrasta', 'sakher-bazar', 'thakurpukur', 'tollygunge', 'park-street', 'esplanade'],
    schedule: [
      {
        id: 'schedule-1',
        departureTime: '06:00',
        arrivalTime: '07:15',
        frequency: 'Every 15 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      {
        id: 'schedule-2',
        departureTime: '07:00',
        arrivalTime: '08:30',
        frequency: 'Every 10 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    ]
  },
  {
    id: 'route-2',
    busNumber: '234',
    name: 'Shyambazar - Garia',
    stops: ['shyambazar', 'hatibagan', 'college-street', 'park-street', 'ballygunge', 'dhakuria', 'jadavpur', 'garia'],
    schedule: [
      {
        id: 'schedule-3',
        departureTime: '05:30',
        arrivalTime: '07:00',
        frequency: 'Every 12 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      {
        id: 'schedule-4',
        departureTime: '08:00',
        arrivalTime: '09:45',
        frequency: 'Every 15 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    ]
  },
  {
    id: 'route-3',
    busNumber: '37A',
    name: 'Esplanade - Behala',
    stops: ['esplanade', 'park-street', 'dharmatala', 'tollygunge', 'thakurpukur', 'behala-chowrasta'],
    schedule: [
      {
        id: 'schedule-5',
        departureTime: '07:30',
        arrivalTime: '08:45',
        frequency: 'Every 20 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      {
        id: 'schedule-6',
        departureTime: '16:00',
        arrivalTime: '17:30',
        frequency: 'Every 15 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    ]
  },
  {
    id: 'route-4',
    busNumber: '45',
    name: 'Jadavpur - Shyambazar',
    stops: ['jadavpur', 'dhakuria', 'ballygunge', 'park-street', 'chandni-chowk', 'college-street', 'sovabazar', 'shyambazar'],
    schedule: [
      {
        id: 'schedule-7',
        departureTime: '06:45',
        arrivalTime: '08:15',
        frequency: 'Every 18 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      {
        id: 'schedule-8',
        departureTime: '17:30',
        arrivalTime: '19:00',
        frequency: 'Every 20 minutes',
        daysOperational: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    ]
  }
];

// Helper function to get bus stops by area
export const getStopsByArea = (areaId: string): BusStop[] => {
  return busStops.filter(stop => stop.areaId === areaId);
};

// Helper function to find routes between stops
export const findRoutes = (departureStopId: string, arrivalStopId: string) => {
  return busRoutes.filter(route => {
    const departureIndex = route.stops.indexOf(departureStopId);
    const arrivalIndex = route.stops.indexOf(arrivalStopId);
    return departureIndex !== -1 && arrivalIndex !== -1 && departureIndex < arrivalIndex;
  });
};