import React, { Component } from 'react';
import logo from './../../logo.svg';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="container-fluid login">
                <div className="row">
                    <div>
                        <img src={logo} className="logo" alt="logo" />
                    </div>
                </div>
                <div className="row login-item">
                    <div className="mb-3 col-11 col-sm-11 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                        <input type="text" className="form-control" placeholder="Usuário" />
                    </div>
                </div>
                <div className="row login-item">
                    <div className="mb-3 col-11 col-sm-11 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                        <input type="password" className="form-control" placeholder="Senha" />
                    </div>
                </div>
                <div className="row login-item">
                    <button type="submit" className="col-10 col-sm-9 col-md-5 col-lg-4 col-xl-3 col-xxl-2 btn btn-primary">Entrar</button>
                </div>
            </div>
        );
    }
}