import React from 'react';
import { Activity, Users, AlertTriangle, Heart } from 'lucide-react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';
import DataTable from '../components/DataTable';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
  const { 
    diseases, 
    countriesData, 
    globalTimeline, 
    selectedDisease,
    loading
  } = useData();

  // Trouver la maladie sélectionnée
  const currentDisease = diseases.find(d => d.id === selectedDisease) || diseases[0];

  // Préparer les données pour le graphique de la chronologie
  const timelineData = globalTimeline.slice(-30);

  // Préparer les données pour le tableau des pays
  const tableColumns = [
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
  ];

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
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu des données et tendances épidémiques mondiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total des cas"
          value={currentDisease?.cases || 0}
          change={2.4}
          icon={<Activity className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Cas actifs"
          value={currentDisease?.active || 0}
          change={5.1}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Décès"
          value={currentDisease?.deaths || 0}
          change={-0.8}
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="Guérisons"
          value={currentDisease?.recovered || 0}
          change={3.2}
          icon={<Heart className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChart
            data={timelineData}
            xKey="date"
            lines={[
              { key: 'cases', color: '#3b82f6', name: 'Total des cas' },
              { key: 'deaths', color: '#ef4444', name: 'Décès' },
              { key: 'recovered', color: '#10b981', name: 'Guérisons' }
            ]}
            title={`${currentDisease?.name || 'Maladie'} Tendances - 30 derniers jours`}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Alertes épidémiques</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="p-2 bg-red-500 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">Augmentation du COVID-19</h4>
                  <p className="text-sm text-red-600">Augmentation significative en Asie du Sud-Est</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800">Épidémie de grippe</h4>
                  <p className="text-sm text-yellow-600">Épidémie saisonnière en Amérique du Nord</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500 rounded-full mr-3">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Campagne de vaccination</h4>
                  <p className="text-sm text-blue-600">Nouvelle campagne de vaccination en Europe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <DataTable
          title="Données par pays"
          data={countriesData}
          columns={tableColumns}
        />
      </div>
    </div>
  );
};

export default Dashboard;