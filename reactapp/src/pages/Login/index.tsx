import React, { Component } from 'react';
import logo from './../../logo.svg';
import './login.css';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import auth from '../../shared/services/auth.service';

interface ILogin {
    isLogin: boolean,
    username: string,
    password: string,
};

export default class Login extends Component<any, ILogin> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: '',
        }
    }

    cadastrar() {
        this.setState(state => ({
            isLogin: !state.isLogin,
        }))
    }

    sign() {
        const body = {
            username: this.state.username,
            password: this.state.password
        };

        if (this.state.isLogin) {
            auth.login(body, (success: boolean) => {
                if (success) {
                    this.props.history.push('/');
                } else {
                    // aqui vai abrir o modal de mensagem
                }
            });
        } else {

        }
    }

    render() {
        return (
            <Container fluid className="login">
                <img src={logo} className="logo" alt="logo" />
                <Form.Group className="form-fluid">
                    <Row className="justify-content-center">
                        <Col xs="12" sm="9" md="7" lg="5" xl="4">
                            <Row className="mb-20">
                                <Col lg="12">
                                    <Form.Control type="text" placeholder="Usuário" size="lg" value={this.state.username} onChange={event => this.setState(() => ({ username: event.target.value }))} />
                                </Col>
                            </Row>
                            <Row className="mb-20">
                                <Col lg="12">
                                    <Form.Control type="password" placeholder="Senha" size="lg" value={this.state.password} onChange={event => this.setState(() => ({ password: event.target.value }))} />
                                </Col>
                            </Row>
                            <Row className="mb-10">
                                <Col lg="12">
                                    <Button variant="primary" onClick={this.sign.bind(this)} size="lg" block>{this.state.isLogin ? 'Entrar' : 'Concluir'}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <Button variant="secondary" onClick={this.cadastrar.bind(this)} size="lg" block>{this.state.isLogin ? 'Cadastrar-se' : 'Voltar'}</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form.Group>
            </Container>
        );
    }
}