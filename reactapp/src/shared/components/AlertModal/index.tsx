import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from "../../../core/store";
import { AlertModalInfo } from "../../../core/store/ducks/AlertModal/types";
import * as AlertModalActions from '../../../core/store/ducks/AlertModal/actions';

interface StateProps {
    info: AlertModalInfo;
}

interface DispatchProps {
    modalHide(): void;
};

type Props = StateProps & DispatchProps;

const AlertModal = (props: Props) => {

    const [promptValue, setPromptValue]: [string, Function] = useState('');

    const { show,
        message,
        prompt,
        buttonPrimaryLabel,
        buttonSecondaryLabel,
        buttonPrimaryAction,
        buttonSecondaryAction } = props.info;
    const { modalHide } = props;

    const handleClose = () => {
        modalHide();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose.bind(this)}
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
                            <Form.Control type="text" value={promptValue} onChange={event => setPromptValue(event.target.value)} />
                        </Form.Group>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {!!buttonSecondaryLabel && (
                    <Button variant="secondary" onClick={!!buttonSecondaryAction ? buttonSecondaryAction.bind(this, promptValue) : undefined}>
                        {buttonSecondaryLabel}
                    </Button>
                )}
                <Button variant="primary" disabled={prompt && !promptValue} onClick={!!buttonPrimaryAction ? buttonPrimaryAction.bind(this, promptValue) : undefined}>
                    {buttonPrimaryLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    info: state.modal.alertModal,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(AlertModalActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);