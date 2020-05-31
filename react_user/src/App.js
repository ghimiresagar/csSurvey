import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

import Header from './components/header';
import Login from './components/login';
import Dashboard from './components/admin/dashboard';
import SurveyLayoutEdit from './components/admin/survey_layout_edit';
import SurveyView from './components/listSurvey/survey_view';

/**
 * This class only matches the url and renders the appropriate component for the url 
 */

function App() {
    return (
      <Router>
        <Header value="Survey Web App" />
        <Switch>
          <UnPrivateRoute exact path='/users' component={Login} />
          <PrivateRoute exact path='/users/surveys' component={Dashboard}/>
          <PrivateRoute exact path='/users/surveys/senior/edit' name="Senior" component={SurveyLayoutEdit} />
          <PrivateRoute exact path='/users/surveys/alumni/edit' name="Alumni" component={SurveyLayoutEdit} />
          <PrivateRoute exact path='/users/surveys/iba/edit' name="Iba" component={SurveyLayoutEdit} />
          <Route exact path='/users/surveys/senior/url/:id' render={(props) => <SurveyView {...props} name="Senior"/> } />
          <Route path='/'>
            <Redirect to="/users" />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
