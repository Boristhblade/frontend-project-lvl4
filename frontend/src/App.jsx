import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Forbidden from './components/404.jsx';
import LoginPage from './components/pages/LoginPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<div />} />
        <Route path="*" element={<Forbidden />} />
      </Routes>
    </Router>
  );
}

export default App;
