import React from 'react';

import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';

import './Location.css';

const Location = () => {
  const position = [23.776956527356614, 90.40442552558086];

  return (
    <div className="mt-32 w-11/12 max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-medium text-center mb-14">Location</h1>
      <h1 className="text-xl mb-4 text-center">
        Our headquarter is in Dhaka, Bangladesh
      </h1>
      <div className="w-full mx-auto h-[600px] rounded-lg overflow-hidden mb-14">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup> 22 Mohakhali, Dhaka</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Location;
