import React from 'react';
import { MessageSquare } from 'lucide-react';
import { SatisfactionData } from '../types';

interface Props {
  comments: SatisfactionData['recentComments'];
}

export const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <MessageSquare className="w-5 h-5 mr-2" />
        <h3 className="text-xl font-semibold">Recent Comments</h3>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${
              comment.sentiment === 'positive'
                ? 'bg-green-50'
                : comment.sentiment === 'negative'
                ? 'bg-red-50'
                : 'bg-gray-50'
            }`}
          >
            <p className="text-gray-800">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};