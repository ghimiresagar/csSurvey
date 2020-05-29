import React, {useContext} from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute';

import Header from './components/header';
import Login from './components/user/login';
import Survey from './components/user/dashboard';
import SurveyLayout from './components/user/survey_layout';
import SurveyView from './components/survey_view';

import {AuthContext} from './Context/AuthContext';

// This class only matches the url and renders the appropriate component for the url 
function App() {

  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  console.log(isAuthenticated);

    return (
      <Router>
        <Header value="Survey Web App" />
        <Switch>
          <Route exact path='/users' render={(props) => <Login />} />
          {/* <PrivateRoute exact path='/users/surveys' name="Senior" component={SurveyLayout} /> */}

          <PrivateRoute exact path='/users/surveys'>
            <Survey value="Senior"/>
            <Survey value="Alumni"/>
            <Survey value="Iba"/>
          </PrivateRoute>

          <PrivateRoute exact path='/users/surveys/senior/edit' name="Senior" component={SurveyLayout} />
          <PrivateRoute exact path='/users/surveys/alumni/edit' name="Alumni" component={SurveyLayout} />
          <PrivateRoute exact path='/users/surveys/iba/edit' name="Iba" component={SurveyLayout} />
          <Route exact path='/users/surveys/senior/url/:id' render={(props) => <SurveyView {...props} name="Senior"/> } />
          <Route path='/'>
            <Redirect to="/users" />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
