


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-gray-50 rounded-3xl shadow-lg p-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
          Smart Career Advisor
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
          Unlock personalized career suggestions powered by AI. Whether you're a student, a graduate,
          or looking to switch paths — we analyze your skills, passions, and goals to find careers that truly fit.
        </p>

        <p className="text-md text-gray-600 mb-12 text-center leading-relaxed">
          Start your journey toward a fulfilling profession with insights that guide your growth and purpose.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/suggest')}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 px-6 py-2.5 rounded-lg text-base font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
            aria-label="Get Started with Career Advisor"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
