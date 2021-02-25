import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from "../../../core/store";
import { AlertModalInfo } from "../../../core/store/ducks/AlertModal/types";
import * as AlertModalActions from '../../../core/store/ducks/AlertModal/actions';

interface IState {
    prompt: string;
}

interface StateProps {
    info: AlertModalInfo;
}

interface DispatchProps {
    modalHide(): void;
};

type Props = StateProps & DispatchProps;

class AlertModal extends Component<Props, IState> {

    state = {
        prompt: ''
    };

    handleClose() {
        this.props.modalHide();
    }

    render() {
        const { show,
            message,
            prompt,
            buttonPrimaryLabel,
            buttonSecondaryLabel,
            buttonPrimaryAction,
            buttonSecondaryAction } = this.props.info;

        return (
            <Modal
                show={show}
                onHide={this.handleClose.bind(this)}
                backdrop={true}
                keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {message}
                    </div>
                    <div>
                        {prompt && (
                            <Form.Group>
                                <Form.Control type="text" value={this.state.prompt} onChange={event => this.setState(state => ({ ...state, prompt: event.target.value }))} />
                            </Form.Group>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {!!buttonSecondaryLabel && (
                        <Button variant="secondary" onClick={!!buttonSecondaryAction ? buttonSecondaryAction.bind(this, this.state.prompt) : undefined}>
                            {buttonSecondaryLabel}
                        </Button>
                    )}
                    <Button variant="primary" disabled={!this.state.prompt} onClick={!!buttonPrimaryAction ? buttonPrimaryAction.bind(this, this.state.prompt) : undefined}>
                        {buttonPrimaryLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    info: state.modal.alertModal,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(AlertModalActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);