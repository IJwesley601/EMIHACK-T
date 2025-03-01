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

  // Find the selected disease
  const currentDisease = diseases.find(d => d.id === selectedDisease) || diseases[0];

  // Prepare data for the timeline chart
  const timelineData = globalTimeline.slice(-30);

  // Prepare data for the countries table
  const tableColumns = [
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
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of global epidemic data and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cases"
          value={currentDisease?.cases || 0}
          change={2.4}
          icon={<Activity className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Cases"
          value={currentDisease?.active || 0}
          change={5.1}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Deaths"
          value={currentDisease?.deaths || 0}
          change={-0.8}
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="Recovered"
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
              { key: 'cases', color: '#3b82f6', name: 'Total Cases' },
              { key: 'deaths', color: '#ef4444', name: 'Deaths' },
              { key: 'recovered', color: '#10b981', name: 'Recovered' }
            ]}
            title={`${currentDisease?.name || 'Disease'} Trends - Last 30 Days`}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Epidemic Alerts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="p-2 bg-red-500 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-red-800">COVID-19 Surge</h4>
                  <p className="text-sm text-red-600">Significant increase in Southeast Asia</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800">Influenza Outbreak</h4>
                  <p className="text-sm text-yellow-600">Seasonal outbreak in North America</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500 rounded-full mr-3">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">Vaccination Campaign</h4>
                  <p className="text-sm text-blue-600">New vaccination drive in Europe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <DataTable
          title="Country-wise Data"
          data={countriesData}
          columns={tableColumns}
        />
      </div>
    </div>
  );
};

export default Dashboard;