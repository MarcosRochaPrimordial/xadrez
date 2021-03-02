import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { bindActionCreators, Dispatch } from 'redux';

import logo from './../../logo.svg';
import './login.css';
import auth from '../../shared/services/auth.service';
import UserService from './../../shared/services/user.service';
import * as MessagesActions from './../../core/store/ducks/Messages/actions';
import { connect } from 'react-redux';

interface DispatchProps {
    alertSuccess(message: string): void;
    alertFailure(message: string): void;
};

interface OwnProps {
    history: any[];
};

type Props = DispatchProps & OwnProps;

const Login = (props: Props) => {
    const [isLogin, setIsLogin]: [boolean, Function] = useState(true);
    const [username, setUsername]: [string, Function] = useState('');
    const [password, setPassword]: [string, Function] = useState('');

    const signUp = () => {
        setIsLogin(!isLogin);
    }

    const sign = () => {
        const body = {
            username,
            password
        };

        if (isLogin) {
            auth.login(body)
                .then((data) => {
                    if (data.success) {
                        props.history.push('/');
                    } else {
                        props.alertFailure(data.errors.join('\n'));
                    }
                })
                .catch(err => {
                    props.alertFailure('An error has occurred. Try again later.');
                });
        } else {
            UserService.signUp(body)
                .then((data) => {
                    if (data.success) {
                        signUp();
                        props.alertSuccess('User registered succesfully.');
                    } else {
                        props.alertFailure(data.errors.join('\n'));
                    }
                })
                .catch(err => {
                    props.alertFailure('An error has occurred. Try again later.');
                });
        }
    }

    return (
        <Container fluid className="login">
            <img src={logo} className="logo" alt="logo" />
            <Form className="form-fluid">
                <Form.Group>
                    <Row className="justify-content-center">
                        <Col xs="12" sm="9" md="7" lg="5" xl="4">
                            <Row className="mb-20">
                                <Col lg="12">
                                    <Form.Control type="text" placeholder="User" size="lg" value={username} onChange={event => setUsername(event.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mb-20">
                                <Col lg="12">
                                    <Form.Control type="password" placeholder="Password" size="lg" value={password} onChange={event => setPassword(event.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mb-10">
                                <Col lg="12">
                                    <Button variant="primary" disabled={!username || !password} onClick={sign.bind(this)} size="lg" block>{isLogin ? 'Sign in' : 'Create Account'}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <Button variant="secondary" onClick={signUp.bind(this)} size="lg" block>{isLogin ? 'Sign up' : 'Back'}</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(MessagesActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);