import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  updateRanking, 
  setRankings, 
  selectAllDishes, 
  selectDishStatus, 
  selectDishError,
  selectRankingCount
} from '../redux/slices/DishSlice';

const pointsMap = {
  1: 30,
  2: 20,
  3: 10,
};

function Voting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const dishes = useSelector(selectAllDishes);
  const status = useSelector(selectDishStatus);
  const error = useSelector(selectDishError);
  const rankingCount = useSelector(selectRankingCount);
  const currentUser = user?.username;
  
  const selections = useSelector((state) => state.dish.rankings);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`votes-${currentUser}`)) || {};
    dispatch(setRankings(stored));
  }, [currentUser, dispatch]);

  const handleRankChange = (dishId, rank) => {
    dispatch(updateRanking({ dishId, rank: rank ? parseInt(rank) : null }));
    const updatedSelections = { ...selections };
    
    if (rank === '') {
      delete updatedSelections[dishId];
    } else {
      updatedSelections[dishId] = parseInt(rank);
    }
    
    localStorage.setItem(`votes-${currentUser}`, JSON.stringify(updatedSelections));
  };

  const handleClearAll = () => {
    dispatch(setRankings({}));
    localStorage.removeItem(`votes-${currentUser}`);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center p-4">
        <h2 className="text-red-600 text-xl">Error loading dishes</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vote Your Favorite Dishes</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Selected: {rankingCount}/3
          </span>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <div 
            key={dish.id} 
            className={`border p-4 rounded shadow transition-all ${
              selections[dish.id] ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <img
              src={dish.image}
              alt={dish.dishName}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{dish.dishName}</h2>
            <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
            <select
              value={selections[dish.id] || ''}
              onChange={(e) => handleRankChange(dish.id, e.target.value)}
              className="mt-2 border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Rank</option>
              <option value="1">1st (30 pts)</option>
              <option value="2">2nd (20 pts)</option>
              <option value="3">3rd (10 pts)</option>
            </select>
            {selections[dish.id] && (
              <p className="mt-2 text-sm text-blue-600">
                Current Rank: {selections[dish.id]} ({pointsMap[selections[dish.id]]} points)
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Voting;
