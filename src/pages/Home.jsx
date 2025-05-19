import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishes } from '../redux/slices/DishSlice';
import Voting from './Voting';
import Results from './Results';

function Home() {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.dish);
  const [activeTab, setActiveTab] = useState('voting');

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'voting'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('voting')}
        >
          Voting
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      {activeTab === 'voting' ? (
        <Voting dishes={dishes} />
      ) : (
        <Results />
      )}
    </div>
  );
}

export default Home;
