import React from 'react';
import Home from './pages/Home';
import SuggestPage from './pages/SuggestPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suggest" element={<SuggestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
