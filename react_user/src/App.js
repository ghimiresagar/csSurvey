import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Login from './components/login';
import Test from './components/test1';

// This class only matches the url and renders the appropriate component for the url 
class App extends React.Component {
  render(){
    return (
      <switch>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
      </switch>
    );
  }
}

export default App;
