import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from './components/user/login';
import { BrowserRouter as Router } from 'react-router-dom';

// This class only matches the url and renders the appropriate component for the url 
class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/users'>
            <Login />
          </Route>
          <Route path='/'>
            <Redirect to="/users" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
