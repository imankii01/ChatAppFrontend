import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      {/* Add more routes as needed */}
    </Router>
  );
}

export default App;
