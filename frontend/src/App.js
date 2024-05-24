import './App.css';

import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import AppLayout from './components/Layout/AppLayout';

const App = (props) => {
  return (
      <Router>
        <AppLayout />
      </Router>
  );
}

export default App;
