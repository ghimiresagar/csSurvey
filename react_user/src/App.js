import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

import Header from './components/header';
import Login from './components/login';
import Dashboard from './components/admin/dashboard/dashboard';
import SurveyLayoutEdit from './components/admin/survey_edit/survey_layout_edit';
import SurveyResult from './components/admin/survey_result/survey_result';
import SurveyView from './components/listSurvey/survey_view';

/**
 * This class only matches the url and renders the appropriate component for the url 
 */

function App() {
    return (
      <Router>
        <Header value="Survey Web App" />
        <Switch>
          <UnPrivateRoute exact path='/' component={Login} />
          <PrivateRoute exact path='/admin/surveys' component={Dashboard}/>
          <PrivateRoute exact path='/admin/surveys/senior/edit' name="Senior" component={SurveyLayoutEdit} />
          <PrivateRoute exact path='/admin/surveys/alumni/edit' name="Alumni" component={SurveyLayoutEdit} />
          <PrivateRoute exact path='/admin/surveys/iba/edit' name="Iba" component={SurveyLayoutEdit} />
          <PrivateRoute exact path='/admin/surveys/results' component={SurveyResult} />
          <Route exact path='/admin/surveys/senior/url/:id' render={(props) => <SurveyView {...props} name="Senior"/> } />
          <Route exact path='/admin/surveys/alumni/url/:id' render={(props) => <SurveyView {...props} name="Alumni"/> } />
          <Route exact path='/admin/surveys/iba/url/:id' render={(props) => <SurveyView {...props} name="Iba"/> } />
          <Route path='/'>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
