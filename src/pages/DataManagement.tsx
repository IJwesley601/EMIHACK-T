import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { useData } from '../context/DataContext';
import { Database, Upload, Download, RefreshCw, Filter } from 'lucide-react';

const DataManagement: React.FC = () => {
  const { countriesData, diseases, selectedDisease, loading } = useData();
  const [activeTab, setActiveTab] = useState<'countries' | 'sources'>('countries');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  // Mock data sources
  const dataSources = [
    {
      id: 1,
      name: 'WHO COVID-19 Dashboard',
      type: 'API',
      lastUpdate: '2023-05-15',
      status: 'Active',
      frequency: 'Daily',
    },
    {
      id: 2,
      name: 'CDC Influenza Data',
      type: 'CSV Import',
      lastUpdate: '2023-05-10',
      status: 'Active',
      frequency: 'Weekly',
    },
    {
      id: 3,
      name: 'ECDC Epidemic Intelligence',
      type: 'API',
      lastUpdate: '2023-05-14',
      status: 'Active',
      frequency: 'Daily',
    },
    {
      id: 4,
      name: 'Johns Hopkins University',
      type: 'API',
      lastUpdate: '2023-05-15',
      status: 'Active',
      frequency: 'Daily',
    },
    {
      id: 5,
      name: 'Our World in Data',
      type: 'CSV Import',
      lastUpdate: '2023-05-12',
      status: 'Active',
      frequency: 'Daily',
    },
  ];

  // Define columns for the countries table
  const countriesColumns = [
    { 
      key: 'country', 
      label: 'Country', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <img 
            src={row.countryInfo.flag} 
            alt={`${value} flag`} 
            className="h-4 w-6 mr-2"
          />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'cases', label: 'Total Cases', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'active', label: 'Active Cases', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'deaths', label: 'Deaths', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'recovered', label: 'Recovered', sortable: true, render: (value: number) => value.toLocaleString() },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: () => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1 text-green-600 hover:text-green-800">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      )
    },
  ];

  // Define columns for the data sources table
  const sourcesColumns = [
    { key: 'name', label: 'Source Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'lastUpdate', label: 'Last Update', sortable: true },
    { key: 'frequency', label: 'Update Frequency', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: () => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-600 hover:text-blue-800">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1 text-green-600 hover:text-green-800">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      )
    },
  ];

  // Filter countries by region (mock implementation)
  const filteredCountries = filterRegion === 'all' 
    ? countriesData 
    : countriesData.filter(country => {
        // This is a simplified mock filter
        if (filterRegion === 'asia') {
          return ['China', 'India', 'Japan', 'South Korea', 'Vietnam', 'Thailand'].includes(country.country);
        } else if (filterRegion === 'europe') {
          return ['Germany', 'France', 'UK', 'Italy', 'Spain', 'Netherlands'].includes(country.country);
        } else if (filterRegion === 'americas') {
          return ['USA', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Colombia'].includes(country.country);
        } else if (filterRegion === 'africa') {
          return ['South Africa', 'Nigeria', 'Egypt', 'Morocco', 'Kenya', 'Ethiopia'].includes(country.country);
        }
        return true;
      });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Data Management</h1>
        <p className="text-gray-600">Manage and export epidemic data</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'countries'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('countries')}
            >
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Countries Data
              </div>
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'sources'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sources')}
            >
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Data Sources
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'countries' && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label htmlFor="disease-filter" className="block text-sm text-gray-600 mb-1">
                      Disease
                    </label>
                    <select
                      id="disease-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedDisease}
                    >
                      {diseases.map((disease) => (
                        <option key={disease.id} value={disease.id}>
                          {disease.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="region-filter" className="block text-sm text-gray-600 mb-1">
                      Region
                    </label>
                    <select
                      id="region-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                    >
                      <option value="all">All Regions</option>
                      <option value="asia">Asia</option>
                      <option value="europe">Europe</option>
                      <option value="americas">Americas</option>
                      <option value="africa">Africa</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </button>
                </div>
              </div>
              
              <DataTable
                title="Countries Data"
                data={filteredCountries}
                columns={countriesColumns}
              />
            </>
          )}

          {activeTab === 'sources' && (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Data Sources</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Add New Source
                </button>
              </div>
              
              <DataTable
                title="Data Sources"
                data={dataSources}
                columns={sourcesColumns}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManagement;