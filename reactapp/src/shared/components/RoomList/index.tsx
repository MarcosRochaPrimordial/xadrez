import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Room } from "../../../core/models/Room";
import PaginationLayout from './../PaginationLayout';
import './roomlist.css';
import AlertModal from "../AlertModal";
import * as AlertModalActions from '../../../core/store/ducks/AlertModal/actions';

interface IState {
    rooms: Room[],
}

interface DispatchProps {
    promptShow(message: string,
        buttonPrimaryLabel: string,
        buttonSecondaryLabel: string,
        buttonPrimaryAction: any,
        buttonSecondaryAction: any): void;
    modalHide(): void;
};

class RoomList extends Component<DispatchProps, IState> {

    state = {
        rooms: [{
            id: 1,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
        },
        {
            id: 2,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
        },
        {
            id: 3,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
        }]
    }
    
    constructor(props: DispatchProps) {
        super(props);
    }

    enterRoom(gameCode: string, roomId: number) {
        console.log(gameCode, 'to room', roomId);
    }

    openModalGameCode(roomId: number) {
        this.props.promptShow(
            'Enter with the code of the room',
            'Ok',
            'Cancel',
            (gameCode: string) => {
                this.enterRoom.call(this, gameCode, roomId);
                this.props.modalHide();
            },
            () => {
                this.props.modalHide.call(this)
            },
        );
    }

    render() {
        return (
            <>
                <Container>
                    {this.state.rooms.map(room => (
                        <Card key={room.id} body>
                            <Row>
                                <Col xs="6" md="9" lg="10">
                                    <Row>
                                        <Col xs="12">{room.playerOneUsername}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">x</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">{room.playerTwoUsername}</Col>
                                    </Row>
                                </Col>
                                <Col xs="6" md="3" lg="2" className="button-center" onClick={this.openModalGameCode.bind(this, room.id)}>
                                    <Button variant="info" block>
                                        Enter
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <div className="mt-10 pagination-position">
                        <PaginationLayout />
                    </div>
                </Container>
                <AlertModal />
            </>
        );
    }
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(AlertModalActions, dispatch);

export default connect(null, mapDispatchToProps)(RoomList);