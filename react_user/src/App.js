import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import Login from './components/user/login';
import Survey from './components/user/dashboard';
import SurveyLayout from './components/user/survey_layout';

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
            <SurveyLayout name="senior"/>
          </Route>
          <Route exact path='/users/surveys/alumni/edit'>
            <SurveyLayout name="alumni"/>
          </Route>
          <Route exact path='/users/surveys/iba/edit'>
            <SurveyLayout name="iba"/>
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
