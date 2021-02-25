import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AlertModal from "../AlertModal";
import * as AlertModalActions from './../../../core/store/ducks/AlertModal/actions';
import * as MessagesActions from './../../../core/store/ducks/Messages/actions';
import RoomService from './../../services/room.service';

interface DispatchProps {
    modalShow(message: string,
        buttonPrimaryLabel: string,
        buttonSecondaryLabel: string,
        buttonPrimaryAction: any,
        buttonSecondaryAction: any): void;
    modalHide(): void;
    alertSuccess(message: string): void;
    alertFailure(message: string): void;
    alertWarning(message: string): void;
};

class SearchRoomForm extends Component<DispatchProps> {

    openModalCreateRoom() {
        this.props.modalShow(
            'Are you sure?',
            'Yes',
            'No',
            () => {
                this.createRoom.call(this);
                this.props.modalHide();
            },
            this.props.modalHide
        );
    }

    createRoom() {
        RoomService.createRoom()
            .then(result => {
                if (result.success) {
                    this.props.alertSuccess('A game room was created successfully');
                } else {
                    this.props.alertFailure('An error has occurred. Try again later.');
                }
            })
            .catch(err => this.props.alertFailure('An error has occurred. Try again later.'));
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col className="mb-10" xs="12" lg="8">
                            <Form.Control placeholder="Search for rooms..." type="text"></Form.Control>
                        </Col>
                        <Col className="mb-10" lg="2" xs="12">
                            <Button variant="primary" block>Search</Button>
                        </Col>
                        <Col className="mb-10" lg="2" xs="12">
                            <Button variant="secondary" block onClick={this.openModalCreateRoom.bind(this)}>Create room</Button>
                        </Col>
                    </Row>
                </Container>
                <AlertModal />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...AlertModalActions, ...MessagesActions }, dispatch);

export default connect(null, mapDispatchToProps)(SearchRoomForm);