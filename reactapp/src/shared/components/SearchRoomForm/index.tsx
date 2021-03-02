import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AlertModal from "../AlertModal";
import * as AlertModalActions from './../../../core/store/ducks/AlertModal/actions';
import * as MessagesActions from './../../../core/store/ducks/Messages/actions';
import * as SearchActions from './../../../core/store/ducks/Search/actions';
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
    searchAction(searchWord: string): void;
};

interface OwnProps {
    history: any[];
};

type Props = DispatchProps & OwnProps;

const SearchRoomForm = (props: Props) => {
    const [search, setSearch]: [string, Function] = useState('');

    const openModalCreateRoom = () => {
        props.modalShow(
            'Are you sure?',
            'Yes',
            'No',
            () => {
                createRoom.call(this);
                props.modalHide();
            },
            props.modalHide
        );
    }

    const createRoom = () => {
        RoomService.createRoom()
            .then(result => {
                if (result.success) {
                    props.history.push(`/playarea/${result.result.id}`);
                    props.alertSuccess('A game room was created successfully');
                } else {
                    props.alertFailure('An error has occurred. Try again later.');
                }
            })
            .catch(err => props.alertFailure('An error has occurred. Try again later.'));
    }

    const searchRoom = () => {
        props.searchAction(search);
    }

    const typeSearch = (value: string) => {
        setSearch(value);
        const tm = setTimeout(() => {
            if (value === '') {
                props.searchAction(value);
            }
        }, 1000);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="mb-10" xs="12" lg="8">
                        <Form.Control placeholder="Search for rooms..." type="text" value={search} onChange={event => typeSearch(event.target.value)}></Form.Control>
                    </Col>
                    <Col className="mb-10" lg="2" xs="12">
                        <Button variant="primary" block onClick={searchRoom.bind(this)}>Search</Button>
                    </Col>
                    <Col className="mb-10" lg="2" xs="12">
                        <Button variant="secondary" block onClick={openModalCreateRoom.bind(this)}>Create room</Button>
                    </Col>
                </Row>
            </Container>
            <AlertModal />
        </>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...AlertModalActions, ...MessagesActions, ...SearchActions }, dispatch);

export default connect(null, mapDispatchToProps)(SearchRoomForm);