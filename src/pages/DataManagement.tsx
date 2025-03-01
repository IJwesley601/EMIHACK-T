import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { useData } from '../context/DataContext';
import { Database, Upload, Download, RefreshCw, Filter } from 'lucide-react';

const DataManagement: React.FC = () => {
  const { countriesData, diseases, selectedDisease, loading } = useData();
  const [activeTab, setActiveTab] = useState<'countries' | 'sources'>('countries');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  // Données sources fictives
  const dataSources = [
    {
      id: 1,
      name: 'Tableau de bord COVID-19 de l\'OMS',
      type: 'API',
      lastUpdate: '2023-05-15',
      status: 'Actif',
      frequency: 'Quotidien',
    },
    {
      id: 2,
      name: 'Données sur la grippe du CDC',
      type: 'Import CSV',
      lastUpdate: '2023-05-10',
      status: 'Actif',
      frequency: 'Hebdomadaire',
    },
    {
      id: 3,
      name: 'Veille épidémique de l\'ECDC',
      type: 'API',
      lastUpdate: '2023-05-14',
      status: 'Actif',
      frequency: 'Quotidien',
    },
    {
      id: 4,
      name: 'Université Johns Hopkins',
      type: 'API',
      lastUpdate: '2023-05-15',
      status: 'Actif',
      frequency: 'Quotidien',
    },
    {
      id: 5,
      name: 'Our World in Data',
      type: 'Import CSV',
      lastUpdate: '2023-05-12',
      status: 'Actif',
      frequency: 'Quotidien',
    },
  ];

  // Définir les colonnes pour le tableau des pays
  const countriesColumns = [
    { 
      key: 'country', 
      label: 'Pays', 
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <img 
            src={row.countryInfo.flag} 
            alt={`Drapeau de ${value}`} 
            className="h-4 w-6 mr-2"
          />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'cases', label: 'Total des cas', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'active', label: 'Cas actifs', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'deaths', label: 'Décès', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'recovered', label: 'Guérisons', sortable: true, render: (value: number) => value.toLocaleString() },
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

  // Définir les colonnes pour le tableau des sources de données
  const sourcesColumns = [
    { key: 'name', label: 'Nom de la source', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'lastUpdate', label: 'Dernière mise à jour', sortable: true },
    { key: 'frequency', label: 'Fréquence de mise à jour', sortable: true },
    { 
      key: 'status', 
      label: 'Statut', 
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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

  // Filtrer les pays par région (implémentation fictive)
  const filteredCountries = filterRegion === 'all' 
    ? countriesData 
    : countriesData.filter(country => {
        // Ceci est un filtre simplifié
        if (filterRegion === 'asia') {
          return ['Chine', 'Inde', 'Japon', 'Corée du Sud', 'Vietnam', 'Thaïlande'].includes(country.country);
        } else if (filterRegion === 'europe') {
          return ['Allemagne', 'France', 'Royaume-Uni', 'Italie', 'Espagne', 'Pays-Bas'].includes(country.country);
        } else if (filterRegion === 'americas') {
          return ['États-Unis', 'Canada', 'Brésil', 'Mexique', 'Argentine', 'Colombie'].includes(country.country);
        } else if (filterRegion === 'africa') {
          return ['Afrique du Sud', 'Nigeria', 'Égypte', 'Maroc', 'Kenya', 'Éthiopie'].includes(country.country);
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
        <h1 className="text-2xl font-bold text-gray-800">Gestion des données</h1>
        <p className="text-gray-600">Gérer et exporter les données épidémiques</p>
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
                Données des pays
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
                Sources de données
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
                      Maladie
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
                      Région
                    </label>
                    <select
                      id="region-filter"
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                    >
                      <option value="all">Toutes les régions</option>
                      <option value="asia">Asie</option>
                      <option value="europe">Europe</option>
                      <option value="americas">Amériques</option>
                      <option value="africa">Afrique</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter les données
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres avancés
                  </button>
                </div>
              </div>
              
              <DataTable
                title="Données des pays"
                data={filteredCountries}
                columns={countriesColumns}
              />
            </>
          )}

          {activeTab === 'sources' && (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Sources de données</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Ajouter une nouvelle source
                </button>
              </div>
              
              <DataTable
                title="Sources de données"
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