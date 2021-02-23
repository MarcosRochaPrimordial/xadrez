import React, { Component } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { bindActionCreators, Dispatch } from 'redux';

import logo from './../../logo.svg';
import './login.css';
import auth from '../../shared/services/auth.service';
import UserService from './../../shared/services/user.service';
import * as MessagesActions from './../../core/store/ducks/Messages/actions';
import { connect } from 'react-redux';

interface IState {
    isLogin: boolean,
    username: string,
    password: string,
};

interface DispatchProps {
    alertSuccess(message: string): void;
    alertFailure(message: string): void;
};

interface OwnProps {
    history: any[];
};

type Props = DispatchProps & OwnProps;

class Login extends Component<Props, IState> {
    state = {
        isLogin: true,
        username: '',
        password: '',
    };

    constructor(props: any) {
        super(props);
    }

    verifyForm() {
        return !this.state.username || !this.state.password;
    }

    signUp() {
        this.setState(state => ({
            isLogin: !state.isLogin,
            username: '',
            password: '',
        }))
    }

    sign() {
        const body = {
            username: this.state.username,
            password: this.state.password
        };

        if (this.state.isLogin) {
            auth.login(body)
                .then((data) => {
                    if (data.success) {
                        this.props.history.push('/');
                    } else {
                        this.props.alertFailure(data.errors.join('\n'));
                    }
                })
                .catch(err => {
                    this.props.alertFailure('An error has occurred. Try again later.');
                });
        } else {
            UserService.signUp(body)
                .then((data) => {
                    if (data.success) {
                        this.props.alertSuccess('User registered succesfully.');
                    } else {
                        this.props.alertFailure(data.errors.join('\n'));
                    }
                })
                .catch(err => {
                    this.props.alertFailure('An error has occurred. Try again later.');
                });
        }
    }

    render() {
        return (
            <Container fluid className="login">
                <img src={logo} className="logo" alt="logo" />
                <Form className="form-fluid">
                    <Form.Group>
                        <Row className="justify-content-center">
                            <Col xs="12" sm="9" md="7" lg="5" xl="4">
                                <Row className="mb-20">
                                    <Col lg="12">
                                        <Form.Control type="text" placeholder="User" size="lg" value={this.state.username} onChange={event => this.setState(() => ({ username: event.target.value }))} />
                                    </Col>
                                </Row>
                                <Row className="mb-20">
                                    <Col lg="12">
                                        <Form.Control type="password" placeholder="Password" size="lg" value={this.state.password} onChange={event => this.setState(() => ({ password: event.target.value }))} />
                                    </Col>
                                </Row>
                                <Row className="mb-10">
                                    <Col lg="12">
                                        <Button variant="primary" disabled={!this.state.username || !this.state.password} onClick={this.sign.bind(this)} size="lg" block>{this.state.isLogin ? 'Sign in' : 'Create Account'}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <Button variant="secondary" onClick={this.signUp.bind(this)} size="lg" block>{this.state.isLogin ? 'Sign up' : 'Back'}</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(MessagesActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);