import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Room } from "../../../../core/models/Room";
import UserStorage from "../../../services/user.storage";

interface OwnProps {
    room: Room;
    getBackToRoom(roomId: number): void;
    openModalGameCode(roomId: number): void;
}

export default class LineRoom extends Component<OwnProps> {

    ownerRole = this.props.room.playerOne.id === UserStorage.getUser().id || this.props.room.playerTwo.id === UserStorage.getUser().id

    openGame() {
        if (this.ownerRole) {
            this.props.getBackToRoom(this.props.room.id);
        } else {
            this.props.openModalGameCode(this.props.room.id);
        }
    }

    render() {
        return (
            <Row>
                <Col xs="6" md="9" lg="10">
                    <Row>
                        <Col xs="12">{this.props.room.playerOne.username}</Col>
                    </Row>
                    <Row>
                        <Col xs="12">x</Col>
                    </Row>
                    <Row>
                        <Col xs="12">{this.props.room.playerTwo.username}</Col>
                    </Row>
                </Col>
                <Col xs="6" md="3" lg="2" className="button-center" onClick={this.openGame.bind(this)}>
                    <Button variant="info" block>
                        Enter
                    </Button>
                </Col>
            </Row>
        );
    }
}