import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Room } from "../../../../core/models/Room";
import UserStorage from "../../../services/user.storage";

interface OwnProps {
    room: Room;
    getBackToRoom(roomId: number): void;
    openModalGameCode(roomId: number): void;
}

const LineRoom = (props: OwnProps) => {
    const { room, getBackToRoom, openModalGameCode } = props;
    const ownerRole = room.playerOne.id === UserStorage.getUser().id || room.playerTwo.id === UserStorage.getUser().id;

    const openGame = () => {
        if (ownerRole) {
            getBackToRoom(room.id);
        } else {
            openModalGameCode(room.id);
        }
    }

    return (
        <Row>
            <Col xs="6" md="9" lg="10">
                <Row>
                    <Col xs="12">{room.playerOne.username}</Col>
                </Row>
                <Row>
                    <Col xs="12">x</Col>
                </Row>
                <Row>
                    <Col xs="12">{room.playerTwo.username}</Col>
                </Row>
            </Col>
            <Col xs="6" md="3" lg="2" className="button-center" onClick={openGame.bind(this)}>
                <Button variant="info" block>Enter</Button>
            </Col>
        </Row>
    );
}

export default LineRoom;