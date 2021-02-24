import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './core/protected.route';
import Home from './pages/Home';
import Login from './pages/Login';
import Playarea from './pages/Playarea';

const Routes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/playarea" component={Playarea} />
            <Route path="/login" component={Login} />
        </Switch>
    );
};

export default Routes;