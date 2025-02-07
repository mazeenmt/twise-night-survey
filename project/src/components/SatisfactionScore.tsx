import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface Props {
  score: number;
}

export const SatisfactionScore: React.FC<Props> = ({ score }) => {
  const getEmoji = () => {
    if (score >= 80) return <Smile className="w-16 h-16 text-green-500" />;
    if (score >= 60) return <Meh className="w-16 h-16 text-yellow-500" />;
    return <Frown className="w-16 h-16 text-red-500" />;
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
      <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full translate-x-16 translate-y-16" />
      </div>
      <div className="relative">
        <div className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          {score}%
        </div>
        <div className="pulse-ring relative">
          {getEmoji()}
        </div>
        <div className="mt-4 text-gray-600 font-medium text-center">
          Overall Satisfaction
        </div>
      </div>
    </div>
  );
};