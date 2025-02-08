import React, { useEffect, useState } from 'react';
import { RefreshCw, Share2 } from 'lucide-react';
import { SatisfactionData } from './types';
import { fetchSatisfactionData } from './services/mockApi';
import { SatisfactionScore } from './components/SatisfactionScore';
import { ResponseBreakdown } from './components/ResponseBreakdown';
import { TrendChart } from './components/TrendChart';
import { Comments } from './components/Comments';
import { ActivitySatisfaction } from './components/ActivitySatisfaction';

function App() {
  const [data, setData] = useState<SatisfactionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      const newData = await fetchSatisfactionData();
      setData(newData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin">
          <RefreshCw className="w-12 h-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-shape animate-float"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                {data.eventTitle}
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin-slow" />
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </p>
            </div>
            <button className="mt-4 md:mt-0 group flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Share Results
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <SatisfactionScore score={data.overallSatisfaction} />
            </div>
            <div className="lg:col-span-2">
              <ResponseBreakdown
                data={data.responseBreakdown}
                total={data.totalResponses}
              />
            </div>
            <div className="lg:col-span-3">
              <Comments comments={data.recentComments} />
            </div>
          </div>

          {/* Activities Section */}
          <ActivitySatisfaction activities={data.activities} />

          {/* Top Aspects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full translate-x-32 -translate-y-32 animate-spin-slow" />
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                Most Praised Aspects
              </h3>
              <div className="space-y-4 relative">
                {data.topPraisedAspects.map((aspect) => (
                  <div key={aspect.aspect} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{aspect.aspect}</span>
                      <span className="font-bold">{aspect.score.toFixed(1)}/10</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: `${(aspect.score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-lg relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full -translate-x-32 -translate-y-32 animate-spin-slow" />
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                Areas for Improvement
              </h3>
              <div className="space-y-4 relative">
                {data.improvements.map((item) => (
                  <div key={item.aspect} className="flex items-center justify-between p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-300">
                    <span className="font-medium">{item.aspect}</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold">
                      {item.count} mentions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;