import React from 'react';
import { SatisfactionData } from '../types';

interface Props {
  data: SatisfactionData['trendData'];
}

export const TrendChart: React.FC<Props> = ({ data }) => {
  const maxSatisfaction = 100;
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxSatisfaction - point.satisfaction) / maxSatisfaction) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Satisfaction Trend</h3>
      <div className="relative h-60">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-200" />
        <div className="absolute top-0 left-0 h-full border-l border-gray-200" />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        {data.map((point, index) => (
          <div key={index} className="text-center">
            <div>{point.date.split('-').slice(1).join('/')}</div>
            <div className="font-medium">{point.satisfaction}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};