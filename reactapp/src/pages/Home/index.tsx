import React, { Component } from 'react';

import auth from '../../shared/services/auth.service';

export default class Home extends Component<any> {

    constructor(props: any) {
        super(props);
    }

    signout() {
        auth.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <button onClick={this.signout.bind(this)}>Log out</button>
            </div>
        );
    }
}