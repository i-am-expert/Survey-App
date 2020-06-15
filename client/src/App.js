import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import Code from './components/Code';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Form} />
          <Route path="/users/:id" component={Code} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
