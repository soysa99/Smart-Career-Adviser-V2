import React, { useState, useRef } from 'react';
import axios from 'axios';

function SuggestionForm() {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const suggestionsRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult([]);

    try {
      const res = await axios.post('http://localhost:5000/api/suggestions', {
        skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        interests: interests.split(',').map(interest => interest.trim()).filter(interest => interest),
        goals,
      });

      setResult(res.data.suggestions);

      setTimeout(() => {
        if (suggestionsRef.current) {
          suggestionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        setError(err.response.data.error || 'Failed to get suggestions');
      } else if (err.request) {
        setError('Cannot connect to server. Please ensure the backend is running on port 5000.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background font-sans p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-10 text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Smart Career Advisor</h1>
        <p className="text-text-light text-lg">
          Discover personalized career paths that align with your strengths, passions, and long-term aspirations. Our AI-driven suggestions help guide your next move.
        </p>
      </div>

      {/* Main Card Section */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row border border-border">
        {/* Left Side */}
        <div className="md:w-6/12 bg-gradient-to-br from-primary to-primary-dark text-white p-8 flex flex-col justify-center items-center text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to CareerPath AI</h2>
            <p className="text-white/90 text-sm">
              Discover your personalized career journey. Input your skills, interests, and aspirations to get tailored career suggestions powered by AI.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-8/12 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-text mb-6">
            Get Personalized Career Advice
          </h2>
          <p className="text-center text-text-light mb-8">
            Tell us about your skills, interests, and career goals to get tailored suggestions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="skills" className="block text-sm font-semibold text-text mb-2">Skills</label>
              <input
                type="text"
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-text"
                placeholder="e.g., Project Management, Data Analysis, Marketing"
                required
              />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-semibold text-text mb-2">Interests</label>
              <input
                type="text"
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-text"
                placeholder="e.g., Web Development, Entrepreneurship, Creative Arts"
                required
              />
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-semibold text-text mb-2">Career Goals</label>
              <input
                type="text"
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-text"
                placeholder="e.g., Lead a product team, Work in sustainable technology"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Getting Suggestions...</span>
                </>
              ) : (
                'Get Career Advice'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-error/10 border border-error text-error rounded-md text-sm">
              <strong className="font-semibold">Error:</strong> {error}
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      {result.length > 0 && (
        <div ref={suggestionsRef} className="w-full max-w-6xl mt-12">
          <h3 className="font-bold text-2xl mb-6 text-success text-center">Career Suggestions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {result
              .filter(
                (suggestion) =>
                  suggestion.title &&
                  suggestion.title.length < 100 &&
                  suggestion.description &&
                  suggestion.description.toLowerCase() !== 'no description available.'
              )
              .map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white border border-success/30 shadow-custom-light p-5 rounded-lg hover:shadow-lg transition duration-200"
                >
                  <h4 className="text-lg font-semibold text-text mb-2 flex items-center">
                    <span className="text-success mr-2">✔</span>
                    {suggestion.title}
                  </h4>
                  <p className="text-text-light text-sm">{suggestion.description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuggestionForm;
