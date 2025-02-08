import React from 'react';
import { SatisfactionData } from '../types';

interface Props {
  data: SatisfactionData['responseBreakdown'];
  total: number;
}

export const ResponseBreakdown: React.FC<Props> = ({ data, total }) => {
  const categories = [
    { key: 'satisfied', label: 'Satisfied', color: 'from-green-400 to-green-300' },
    { key: 'neutral', label: 'Neutral', color: 'from-yellow-400 to-yellow-300' },
    { key: 'dissatisfied', label: 'Dissatisfied', color: 'from-red-400 to-red-300' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full translate-x-32 -translate-y-32 animate-spin-slow" />
      </div>
      <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Response Breakdown
      </h3>
      <div className="space-y-6 relative">
        {categories.map(({ key, label, color }) => (
          <div key={key} className="space-y-2 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{label}</span>
              <span className="font-bold">
                {data[key as keyof typeof data]} ({Math.round((data[key as keyof typeof data] / total) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${(data[key as keyof typeof data] / total) * 100}%`,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)' 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};