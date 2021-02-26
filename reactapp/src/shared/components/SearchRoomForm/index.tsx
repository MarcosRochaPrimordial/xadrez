import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AlertModal from "../AlertModal";
import * as AlertModalActions from './../../../core/store/ducks/AlertModal/actions';
import * as MessagesActions from './../../../core/store/ducks/Messages/actions';
import * as SearchActions from './../../../core/store/ducks/Search/actions';
import RoomService from './../../services/room.service';

interface IState {
    search: string;
};

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
    searchAction(searchWord: string): void;
};

class SearchRoomForm extends Component<DispatchProps, IState> {

    state: IState = {
        search: '',
    };

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
                    this.props.searchAction(this.state.search);
                    this.props.alertSuccess('A game room was created successfully');
                } else {
                    this.props.alertFailure('An error has occurred. Try again later.');
                }
            })
            .catch(err => this.props.alertFailure('An error has occurred. Try again later.'));
    }

    searchRoom() {
        this.props.searchAction(this.state.search);
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col className="mb-10" xs="12" lg="8">
                            <Form.Control placeholder="Search for rooms..." type="text" value={this.state.search} onChange={event => this.setState(state => ({ ...state, search: event.target.value }))}></Form.Control>
                        </Col>
                        <Col className="mb-10" lg="2" xs="12">
                            <Button variant="primary" block onClick={this.searchRoom.bind(this)}>Search</Button>
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
    bindActionCreators({ ...AlertModalActions, ...MessagesActions, ...SearchActions }, dispatch);

export default connect(null, mapDispatchToProps)(SearchRoomForm);