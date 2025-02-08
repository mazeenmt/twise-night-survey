import React from 'react';
import { Activity, BarChart, Users, Clock } from 'lucide-react';
import { SatisfactionData } from '../types';

interface Props {
  activities: SatisfactionData['activities'];
}

export const ActivitySatisfaction: React.FC<Props> = ({ activities }) => {
  return (
    <div className="col-span-full bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full animate-spin-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${20 + i * 5}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 relative">
        Activity Satisfaction
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="group relative bg-white/50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Animated background circles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full animate-spin-slow" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            </div>

            <div className="relative">
              <div className="flex items-center mb-4">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                <h4 className="text-lg font-semibold">{activity.name}</h4>
              </div>

              {/* Satisfaction Meter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Satisfaction</span>
                  <span className="font-bold">{activity.satisfaction}%</span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: `${activity.satisfaction}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Activity Details */}
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <BarChart className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{activity.engagement}% engagement</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
                  {activity.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};