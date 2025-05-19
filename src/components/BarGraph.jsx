import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const pointsMap = {
  1: 30,
  2: 20,
  3: 10,
};

function BarGraph({ results = [] }) {
  // Prepare data for the chart
  const chartData = results.map((dish) => ({
    name: dish.dishName || 'Unknown Dish',
    points: dish.points || 0,
    userRank: dish.userRank ? `${dish.userRank} (${pointsMap[dish.userRank]} pts)` : null,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">Points: {data.points}</p>
          {data.userRank && (
            <p className="text-green-600">Your Rank: {data.userRank}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!results || results.length === 0) {
    return (
      <div className="w-full h-[400px] mt-8 flex items-center justify-center">
        <p className="text-gray-600">No data available to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ 
              value: 'Points', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="points" 
            fill="#3B82F6" 
            name="Total Points"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph; 