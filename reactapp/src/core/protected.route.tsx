import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from '../shared/services/auth.service';

export const ProtectedRoute = ({ component, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />;
                }
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                } />
            }}
        />
    );
}