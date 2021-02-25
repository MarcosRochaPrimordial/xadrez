import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AlertModal from "../AlertModal";
import * as AlertModalActions from '../../../core/store/ducks/AlertModal/actions';

interface DispatchProps {
    modalShow(message: string,
        buttonPrimaryLabel: string,
        buttonSecondaryLabel: string,
        buttonPrimaryAction: any,
        buttonSecondaryAction: any): void;
    modalHide(): void;
};

class SearchRoomForm extends Component<DispatchProps> {

    createRoom() {
        this.props.modalShow(
            'Are you sure?',
            'Yes',
            'No',
            () => console.log('Teste'),
            this.props.modalHide
        );
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
                            <Button variant="secondary" block onClick={this.createRoom.bind(this)}>Create room</Button>
                        </Col>
                    </Row>
                </Container>
                <AlertModal />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(AlertModalActions, dispatch);

export default connect(null, mapDispatchToProps)(SearchRoomForm);