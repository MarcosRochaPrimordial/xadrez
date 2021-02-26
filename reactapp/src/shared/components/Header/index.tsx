import { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';

import auth from './../../services/auth.service';
import './header.css';

interface OwnProps {
    history: any;
    gameCode?: string;
}

export default class Header extends Component<OwnProps> {
    constructor(props: OwnProps) {
        super(props);
    }

    signout() {
        auth.logout();
        this.props.history.push('/login');
    }

    exitRoom() {
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Chess</Navbar.Brand>
                <div className="btn-logout">
                    <h3 className="chess-code">{this.props.gameCode}</h3>
                    {!!this.props.gameCode && (
                        <Button variant="outline-warning mr-10" onClick={this.exitRoom.bind(this)}>Exit</Button>
                    )}
                    <Button variant="outline-success" onClick={this.signout.bind(this)}>Logout</Button>
                </div>
            </Navbar>
        );
    }
}