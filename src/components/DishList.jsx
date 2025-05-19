import React from 'react'

const pointsMap = {
  1: 30,
  2: 20,
  3: 10,
};

function DishList({ results = [] }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No dishes available to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((dish, idx) => (
        <div
          key={dish.id}
          className={`p-4 border rounded shadow flex items-center gap-4 transition-all ${
            dish.userRank ? 'bg-green-50 border-green-500' : 'bg-white'
          }`}
        >
          <div className="relative">
            <img 
              src={dish.image} 
              alt={dish.dishName || 'Dish'} 
              className="w-24 h-24 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
            {dish.userRank && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {dish.userRank}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                #{idx + 1} - {dish.dishName || 'Unknown Dish'}
              </h3>
              <span className="text-blue-600 font-medium">
                {dish.points || 0} points
              </span>
            </div>
            <p className="text-gray-600 text-sm">{dish.description || 'No description available'}</p>
            {dish.userRank && (
              <p className="text-green-600 text-sm mt-1">
                Your Rank: {dish.userRank} ({pointsMap[dish.userRank] || 0} points)
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DishList