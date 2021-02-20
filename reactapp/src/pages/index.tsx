import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import Routes from './../routes';
import { ApplicationState } from '../core/store';
import { Message } from '../core/store/ducks/Messages/types';
import { LoadingState } from '../core/store/ducks/Loading/types';

interface StateProps {
    messages: Message[];
    loading: LoadingState,
};

class Pages extends Component<StateProps> {

    componentDidUpdate() {
        const { messages } = this.props;
        if (messages.length) {
            setTimeout(() => {
                messages.splice(0, 1);
                this.setState(state => ({
                    ...state,
                    messages
                }));
            }, 5000);
        }
    }

    render() {
        const { messages, loading } = this.props;
        let spin = <div></div>;
        if (loading.show) {
            spin = <div className="spin-wrap">
                <Spinner animation="border" />
            </div>;
        }
        return (
            <div>
                {spin}
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

const mapStateToProps = ({ messages, loading }: ApplicationState) => ({
    messages: messages.messages,
    loading,
});

export default connect(mapStateToProps)(Pages);