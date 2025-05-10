import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Area } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AreaCardProps {
  area: Area;
}

const areaCoordinates: Record<string, [number, number]> = {
  behala: [22.5013, 88.3081],
  'north-kolkata': [22.6033, 88.3778],
  'south-kolkata': [22.5076, 88.3667],
  'central-kolkata': [22.5677, 88.3476],
};

export default function AreaCard({ area }: AreaCardProps) {
  const coordinates = areaCoordinates[area.id.toLowerCase()] || [22.5726, 88.3639]; // default center

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{area.name}</CardTitle>
        <CardDescription>{area.description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>{area.name}</Popup>
          </Marker>
        </MapContainer>
      </CardContent>
    </Card>
  );
}

