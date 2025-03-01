import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../context/DataContext';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent: React.FC = () => {
  const { countriesData, selectedDisease } = useData();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Set map as ready after component mounts
    setMapReady(true);
  }, []);

  // Calculate circle radius based on cases
  const getCircleRadius = (cases: number) => {
    return Math.sqrt(cases) * 200;
  };

  // Get circle color based on active cases
  const getCircleColor = (active: number) => {
    if (active > 100000) return '#FF0000';
    if (active > 50000) return '#FF4500';
    if (active > 10000) return '#FFA500';
    if (active > 5000) return '#FFCC00';
    return '#00CC00';
  };

  if (!mapReady) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData.map((country) => (
          <React.Fragment key={country.country}>
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={getCircleRadius(country.cases)}
              pathOptions={{
                color: getCircleColor(country.active),
                fillColor: getCircleColor(country.active),
                fillOpacity: 0.4,
              }}
            />
            <Marker position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <img 
                      src={country.countryInfo.flag} 
                      alt={`${country.country} flag`} 
                      className="h-4 mr-2"
                    />
                    <h3 className="font-bold">{country.country}</h3>
                  </div>
                  <p><strong>Disease:</strong> {selectedDisease.toUpperCase()}</p>
                  <p><strong>Total Cases:</strong> {country.cases.toLocaleString()}</p>
                  <p><strong>Active Cases:</strong> {country.active.toLocaleString()}</p>
                  <p><strong>Deaths:</strong> {country.deaths.toLocaleString()}</p>
                  <p><strong>Recovered:</strong> {country.recovered.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;