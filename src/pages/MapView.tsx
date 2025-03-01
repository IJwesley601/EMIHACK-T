import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { useData } from '../context/DataContext';
import { Map, Filter, AlertTriangle } from 'lucide-react';

const MapView: React.FC = () => {
  const { selectedDisease, setSelectedDisease, diseases, loading } = useData();
  const [mapType, setMapType] = useState<'cases' | 'deaths' | 'recovered'>('cases');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Geographic Distribution</h1>
        <p className="text-gray-600">Interactive map of epidemic hotspots</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <div className="w-full md:w-3/4 flex flex-col">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Map className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Global Epidemic Map</h3>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <label htmlFor="disease-select" className="block text-sm text-gray-600 mb-1">
                    Disease
                  </label>
                  <select
                    id="disease-select"
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDisease}
                    onChange={(e) => setSelectedDisease(e.target.value)}
                  >
                    {diseases.map((disease) => (
                      <option key={disease.id} value={disease.id}>
                        {disease.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="map-type" className="block text-sm text-gray-600 mb-1">
                    Display
                  </label>
                  <select
                    id="map-type"
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={mapType}
                    onChange={(e) => setMapType(e.target.value as any)}
                  >
                    <option value="cases">Total Cases</option>
                    <option value="deaths">Deaths</option>
                    <option value="recovered">Recovered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-full">
              <MapComponent />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-3">
              <Filter className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-medium">Map Legend</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">High Infection Rate</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Medium Infection Rate</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Low Infection Rate</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Minimal Infection Rate</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="font-medium">Hotspot Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="text-sm font-medium text-red-800">New Delhi, India</h4>
                <p className="text-xs text-red-600 mt-1">Rapid increase in cases over the past week</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="text-sm font-medium text-red-800">São Paulo, Brazil</h4>
                <p className="text-xs text-red-600 mt-1">Healthcare system under pressure</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800">Los Angeles, USA</h4>
                <p className="text-xs text-yellow-600 mt-1">Moderate increase in hospitalization</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-medium mb-3">Regional Statistics</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Asia</h4>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Total Cases</span>
                  <span>24.5M</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Europe</h4>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Total Cases</span>
                  <span>18.2M</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">North America</h4>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Total Cases</span>
                  <span>15.8M</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Africa</h4>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Total Cases</span>
                  <span>8.4M</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;