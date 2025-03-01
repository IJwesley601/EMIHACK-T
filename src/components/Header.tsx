import React, { useState } from 'react';
import { Bell, Search, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { refreshData, loading, selectedDisease, setSelectedDisease, diseases } = useData();

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Rafraîchir les données
        </button>

        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;