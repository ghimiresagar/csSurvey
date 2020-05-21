import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import Login from './components/user/login';
import Survey from './components/user/survey';
import SeniorSurvey from './components/user/senior_survey';

// This class only matches the url and renders the appropriate component for the url 
class App extends React.Component {
  render(){
    return (
      
      <Router>
        <Header value="Survey Web App" />
        <Switch>
          <Route exact path='/users'>
            <Login />
          </Route>
          <Route exact path='/users/surveys'>
            <Survey value="Senior"/>
            <Survey value="Alumni"/>
            <Survey value="Iba"/>
          </Route>
          <Route exact path='/users/surveys/senior/edit'>
            <SeniorSurvey />
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
