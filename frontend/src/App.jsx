import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Forbidden from './components/404.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Chat />
        </Route>
        <Route path="*">
          <Forbidden />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
