import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import Routes from './../routes';
import { ApplicationState } from '../core/store';
import { Message } from '../core/store/ducks/Messages/types';

interface StateProps {
    messages: Message[];
};

interface IState {
    messages: Message[];
}

class Pages extends Component<StateProps, IState> {

    state = {
        messages: []
    };

    componentDidUpdate() {
        const { messages } = this.props;
        if (messages.length) {
            setTimeout(() => {
                messages.splice(0, 1);
                this.setState(state => ({
                    messages,
                }));
            }, 5000);
        }
    }

    render() {
        const { messages } = this.props;
        return (
            <div>
                <div className="sys-alert">
                    {messages.map(message => (
                        <Alert key={message.id} variant={message.type}>
                            {message.message}
                        </Alert>
                    ))}
                </div>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = ({ messages }: ApplicationState) => ({
    messages: messages.messages,
});

export default connect(mapStateToProps)(Pages);