import React from 'react';
import PredictionChart from '../components/PredictionChart';
import { useData } from '../context/DataContext';
import { Brain, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

const PredictionsPage: React.FC = () => {
  const { predictions, selectedDisease, diseases, loading } = useData();
  
  // Find the selected disease
  const currentDisease = diseases.find(d => d.id === selectedDisease) || diseases[0];

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
        <h1 className="text-2xl font-bold text-gray-800">AI Predictions</h1>
        <p className="text-gray-600">Machine learning forecasts for epidemic trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">AI Model</h3>
              <p className="text-sm text-gray-500">LSTM Neural Network</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="text-sm font-medium">94.2%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Training Data</span>
              <span className="text-sm font-medium">2 years</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '80%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Features</span>
              <span className="text-sm font-medium">12 parameters</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">30-Day Forecast</h3>
              <p className="text-sm text-gray-500">{currentDisease?.name}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Predicted New Cases</span>
              <span className="text-sm font-medium text-blue-600">
                +{(predictions[29]?.predictedCases - predictions[0]?.predictedCases).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-sm font-medium text-red-500">+12.4%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Peak Date</span>
              <span className="text-sm font-medium">{predictions[20]?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Confidence Level</span>
              <span className="text-sm font-medium">{(predictions[0]?.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Risk Assessment</h3>
              <p className="text-sm text-gray-500">Based on AI predictions</p>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <h4 className="text-sm font-medium text-red-800">High Risk Regions</h4>
              <p className="text-xs text-red-600 mt-1">Southeast Asia, South America</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <h4 className="text-sm font-medium text-yellow-800">Moderate Risk Regions</h4>
              <p className="text-xs text-yellow-600 mt-1">North America, Europe</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <h4 className="text-sm font-medium text-green-800">Low Risk Regions</h4>
              <p className="text-xs text-green-600 mt-1">Australia, New Zealand</p>
            </div>
          </div>
        </div>
      </div>

      <PredictionChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium">Prediction Factors</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Population Density</span>
                <span className="text-sm font-medium">High Impact</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Vaccination Rate</span>
                <span className="text-sm font-medium">Medium Impact</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Travel Patterns</span>
                <span className="text-sm font-medium">High Impact</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Healthcare Capacity</span>
                <span className="text-sm font-medium">Medium Impact</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Seasonal Factors</span>
                <span className="text-sm font-medium">Low Impact</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium mb-4">Recommended Actions</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-red-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-red-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Increase Testing Capacity</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Deploy mobile testing units in high-risk areas to identify cases early.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-yellow-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-yellow-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Vaccination Campaign</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Accelerate vaccination efforts in regions showing increasing trends.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-green-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-green-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Public Awareness</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Launch targeted information campaigns about preventive measures.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Healthcare Preparedness</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Increase hospital capacity in areas predicted to experience surges.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-purple-100 mr-3 mt-0.5">
                <span className="block h-2 w-2 rounded-full bg-purple-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Travel Restrictions</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Consider temporary travel limitations from high-risk to low-risk regions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage;