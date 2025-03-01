import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../context/DataContext';
import L from 'leaflet';

// Correction pour les icônes de marqueurs par défaut dans React Leaflet
delete (L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent: React.FC = () => {
  const { countriesData, selectedDisease } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<any>(null); // Référence à la carte Leaflet
  const [filteredCountries, setFilteredCountries] = useState(countriesData); // Pays filtrés
  const [searchResult, setSearchResult] = useState(null); // Résultat de la recherche
  const mapRef = useRef(null); // Référence pour manipuler la carte

  // Fonction pour rechercher un lieu avec OpenStreetMap
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon), name: display_name };
        setSearchResult(newPosition);

        // Zoomer et recentrer la carte sur le résultat
        if (mapRef.current) {
          mapRef.current.setView([newPosition.lat, newPosition.lng], 5 );
        }
      } else {
        setSearchResult(null);
        alert('Aucun résultat trouvé.');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
      alert('Une erreur est survenue lors de la recherche.');
    }
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
      {/* Barre de recherche */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Rechercher un pays ou une ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Carte */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: 'calc(100% - 64px)', width: '100%' }}
        minZoom={2}
        whenCreated={setMap} // Référence à la carte Leaflet
        ref={mapRef} // Référence pour manipulation future
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
        />
        
        {/* Marqueur pour le lieu recherché */}
        {searchResult && (
          <Marker position={[searchResult.lat, searchResult.lng]}>
            <Popup>
              {/* Trouver le pays correspondant dans les données */}
              {countriesData
                .filter((country) => country.country.toLowerCase() === searchResult.name.toLowerCase())
                .map((country) => (
                  <div key={country.country} className="p-2">
                    <div className="flex items-center mb-2">
                      <img 
                        src={country.countryInfo.flag} 
                        alt={`Drapeau de ${country.country}`} 
                        className="h-4 mr-2"
                      />
                      <h3 className="font-bold">{country.country}</h3>
                    </div>
                    <p><strong>Maladie :</strong> {selectedDisease.toUpperCase()}</p>
                    <p><strong>Total des cas :</strong> {country.cases.toLocaleString()}</p>
                    <p><strong>Cas actifs :</strong> {country.active.toLocaleString()}</p>
                    <p><strong>Décès :</strong> {country.deaths.toLocaleString()}</p>
                    <p><strong>Guérisons :</strong> {country.recovered.toLocaleString()}</p>
                  </div>
                ))}
            </Popup>
          </Marker>
        )}

        {/* Affichage des pays */}
        {filteredCountries.map((country) => (
          <React.Fragment key={country.country}>
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              radius={Math.sqrt(country.cases) * 200}
              pathOptions={{
                color: country.active > 100000 ? '#FF0000' :
                       country.active > 50000 ? '#FF4500' :
                       country.active > 10000 ? '#FFA500' :
                       country.active > 5000 ? '#FFCC00' : '#00CC00',
                fillColor: country.active > 100000 ? '#FF0000' :
                           country.active > 50000 ? '#FF4500' :
                           country.active > 10000 ? '#FFA500' :
                           country.active > 5000 ? '#FFCC00' : '#00CC00',
                fillOpacity: 0.4,
              }}
            />
            <Marker position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <img 
                      src={country.countryInfo.flag} 
                      alt={`Drapeau de ${country.country}`} 
                      className="h-4 mr-2"
                    />
                    <h3 className="font-bold">{country.country}</h3>
                  </div>
                  <p><strong>Maladie :</strong> {selectedDisease.toUpperCase()}</p>
                  <p><strong>Total des cas :</strong> {country.cases.toLocaleString()}</p>
                  <p><strong>Cas actifs :</strong> {country.active.toLocaleString()}</p>
                  <p><strong>Décès :</strong> {country.deaths.toLocaleString()}</p>
                  <p><strong>Guérisons :</strong> {country.recovered.toLocaleString()}</p>
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