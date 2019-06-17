import React from 'react';
import { BrowserRouter as Router, Toute, Switch } from 'react-router-dom';

import './App.css';
import AppNavbar from './components/layout/AppNavbar';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <div className="container">
          <h1>Hola</h1>
        </div>
      </div>
    </Router>
  );
}

export default App;
