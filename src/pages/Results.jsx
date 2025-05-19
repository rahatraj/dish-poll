import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DishList from '../components/DishList';
import BarGraph from '../components/BarGraph';

const pointsMap = {
  1: 30,
  2: 20,
  3: 10,
};

function Results() {
  const { dishes = [] } = useSelector((state) => state.dish);
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.username;

  const results = useMemo(() => {
    if (!dishes || dishes.length === 0) return [];

    const scores = {};
    const allKeys = Object.keys(localStorage).filter((key) => key.startsWith('votes-'));

    allKeys.forEach((key) => {
      try {
        const votes = JSON.parse(localStorage.getItem(key)) || {};
        for (let dishId in votes) {
          const rank = votes[dishId];
          if (rank && pointsMap[rank]) {
            scores[dishId] = (scores[dishId] || 0) + pointsMap[rank];
          }
        }
      } catch (error) {
        console.error('Error parsing votes:', error);
      }
    });

    return dishes
      .map((dish) => {
        try {
          const userVotes = JSON.parse(localStorage.getItem(`votes-${currentUser}`)) || {};
          return {
            ...dish,
            points: scores[dish.id] || 0,
            userRank: userVotes[dish.id] || null,
          };
        } catch (error) {
          console.error('Error processing dish:', error);
          return {
            ...dish,
            points: 0,
            userRank: null,
          };
        }
      })
      .sort((a, b) => b.points - a.points);
  }, [dishes, currentUser]);

  if (!dishes || dishes.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Poll Results</h1>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">No dishes available to display results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Poll Results</h1>
      
      {/* Bar Graph Visualization */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Points Distribution</h2>
        <BarGraph results={results} />
      </div>

      {/* Dish List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
        <DishList results={results} />
      </div>
    </div>
  );
}

export default Results;
