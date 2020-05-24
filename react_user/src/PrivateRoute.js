import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

// find component property and assign it to new location Component
// all other property to rest
function PrivateRoute({ component: Component, ...rest }) {

    const isAuthenticated = useAuth();

    return (
        <Route 
        {...rest} 
        render={(props) => 
            isAuthenticated ? (
            <Component {...props} name="senior"/>
        ) : (
            <Redirect to="/" />
        )}
        />
    );
}

export default PrivateRoute;