import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useData } from '../context/DataContext';

const PredictionChart: React.FC = () => {
  const { predictions, globalTimeline } = useData();
  
  // Récupérer le dernier point de données réel
  const lastActualDataPoint = globalTimeline[globalTimeline.length - 1];
  
  // Combiner les données historiques et les prédictions
  const combinedData = [
    ...globalTimeline.slice(-30).map(item => ({
      ...item,
      type: 'historical'
    })),
    ...predictions.map(item => ({
      date: item.date,
      cases: item.predictedCases,
      deaths: item.predictedDeaths,
      type: 'prediction',
      confidence: item.confidence
    }))
  ];

  // Trouver l'index où les prédictions commencent
  const predictionStartIndex = combinedData.findIndex(item => item.type === 'prediction');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Modèle de prédiction IA</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Données historiques</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Prédiction IA</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={combinedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              if (typeof value === 'string' && value.includes('-')) {
                const parts = value.split('-');
                return `${parts[1]}/${parts[2]}`;
              }
              return value;
            }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `${(value / 1000).toFixed(0)}K`;
              }
              return value;
            }}
          />
          <Tooltip 
            formatter={(value: number) => [value.toLocaleString(), '']}
            labelFormatter={(label) => {
              if (typeof label === 'string' && label.includes('-')) {
                const date = new Date(label);
                return date.toLocaleDateString();
              }
              return label;
            }}
          />
          <Legend />
          
          {/* Ligne de référence où la prédiction commence */}
          {predictionStartIndex > 0 && (
            <ReferenceLine
              x={combinedData[predictionStartIndex].date}
              stroke="#ff0000"
              strokeDasharray="3 3"
              label={{ value: 'Début de la prédiction', position: 'top', fill: '#ff0000' }}
            />
          )}
          
          {/* Données historiques */}
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            name="Cas historiques"
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            connectNulls={true}
            dot={false}
          />
          
          {/* Données de prédiction */}
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
            name="Cas prédits"
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            connectNulls={true}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Confiance du modèle IA</h4>
        <p className="text-sm text-gray-700">
          Le modèle de prédiction a un niveau de confiance de {(predictions[0]?.confidence * 100).toFixed(1)}% pour les 7 prochains jours, 
          diminuant à {(predictions[predictions.length - 1]?.confidence * 100).toFixed(1)}% pour la prévision sur 30 jours.
        </p>
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: `${predictions[0]?.confidence * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PredictionChart;