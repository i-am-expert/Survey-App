import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Form from './components/Form';
import Code from './components/Code';
import Question from './components/Question';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Form} />
          <Route path="/users/survey/:id" component={Question} />
          <Route path="/users/:id" component={Code} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
