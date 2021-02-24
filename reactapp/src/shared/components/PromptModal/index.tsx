import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from "../../../core/store";
import { PromptModalInfo } from "../../../core/store/ducks/PromptModal/types";
import * as PromptModalActions from './../../../core/store/ducks/PromptModal/actions';

interface StateProps {
    info: PromptModalInfo;
}

interface DispatchProps {
    modalHide(): void;
};

type Props = StateProps & DispatchProps;

class PromptModal extends Component<Props> {

    handleClose() {
        this.props.modalHide();
    }

    render() {
        const { show,
            message,
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
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    {!!buttonSecondaryLabel && (
                        <Button variant="secondary" onClick={buttonSecondaryAction}>
                            {buttonSecondaryLabel}
                        </Button>
                    )}
                    <Button variant="primary" onClick={buttonPrimaryAction}>
                        {buttonPrimaryLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    info: state.modal.promptModal,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(PromptModalActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PromptModal);