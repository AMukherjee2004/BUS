export interface User {
  id: string;
  username: string;
  name?: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface BusStop {
  id: string;
  name: string;
  areaId: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  name: string;
  stops: string[]; // BusStop ids
  schedule: BusSchedule[];
}

export interface BusSchedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  frequency: string;
  daysOperational: string[];
}

export interface RouteResult {
  busNumber: string;
  routeName: string;
  departureStop: string;
  arrivalStop: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}