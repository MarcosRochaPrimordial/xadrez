import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './core/protected.route';
import Home from './pages/Home';
import Login from './pages/Login';

const Routes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    );
};

export default Routes;