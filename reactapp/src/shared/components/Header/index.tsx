import { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';

import auth from './../../services/auth.service';
import './header.css';

export default class Header extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    signout() {
        auth.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Chess</Navbar.Brand>
                <div className="btn-logout">
                    <Button variant="outline-success" onClick={this.signout.bind(this)}>Logout</Button>
                </div>
            </Navbar>
        );
    }
}