import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes.js';

const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default App;
