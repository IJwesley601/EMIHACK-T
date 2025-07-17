import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '../context/DataContext'; // Assurez-vous que le chemin est correct

interface LineChartProps {
  title: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ title, height = 400 }) => {
  const { diseases } = useData();

  // Transformer les données des épidémies pour le graphique
  const chartData = diseases.map((disease) => ({
    name: disease.name,
    cases: disease.cases,
    deaths: disease.deaths,
    recovered: disease.recovered,
  }));

  // Définir les lignes à afficher
  const lines = [
    { key: 'cases', color: '#8884d8', name: 'Cas' },
    { key: 'deaths', color: '#82ca9d', name: 'Décès' },
    { key: 'recovered', color: '#ffc658', name: 'Récupérés' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name" // Afficher le nom de l'épidémie sur l'axe X
            tick={{ fontSize: 12 }}
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
            labelFormatter={(label) => label} // Afficher le nom de l'épidémie dans le tooltip
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;