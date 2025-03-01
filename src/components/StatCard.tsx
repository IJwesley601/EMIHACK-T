import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change && change > 0;
  const changeText = change ? `${isPositive ? '+' : ''}${change}%` : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
          )}
          <span 
            className={`text-sm font-medium ${
              isPositive ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {changeText} from last week
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;