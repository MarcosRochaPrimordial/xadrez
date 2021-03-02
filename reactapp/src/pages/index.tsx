import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Routes from './../routes';
import { ApplicationState } from '../core/store';
import { Message } from '../core/store/ducks/Messages/types';
import { LoadingState } from '../core/store/ducks/Loading/types';
import * as MessageActions from './../core/store/ducks/Messages/actions';

interface StateProps {
    messages: Message[];
    loading: LoadingState,
};

interface DispatchProps {
    alertDismiss(): void;
}

type Props = StateProps & DispatchProps;

const Pages = (props: Props) => {

    useEffect(() => {
        const { messages, alertDismiss } = props;
        if (messages.length) {
            setTimeout(() => {
                alertDismiss();
            }, 5000);
        }
    });

    return (
        <div>
            {props.loading.show && (
                <div className="spin-wrap">
                    <Spinner animation="border" />
                </div>
            )}
            <div className="sys-alert">
                {props.messages.map(message => (
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
};

const mapStateToProps = ({ messages, loading }: ApplicationState) => ({
    messages: messages.messages,
    loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...MessageActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pages);