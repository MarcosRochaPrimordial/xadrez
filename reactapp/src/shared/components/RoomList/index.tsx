import React, { Component } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Room } from "../../../core/models/Room";
import PaginationLayout from './../PaginationLayout';
import './roomlist.css';

interface IState {
    rooms: Room[]
}

export default class RoomList extends Component<any, IState> {

    state = {
        rooms: [
            {
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
            }
        ],
    };

    componentDidMount() {
    }

    render() {
        const { rooms } = this.state;
        return (
            <Container>
                {rooms.map(room => (
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
                            <Col xs="6" md="3" lg="2">
                                <Row>
                                    <Col xs="12">
                                        <Form.Control placeholder="Room Code" type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row className="mt-10">
                                    <Col xs="12">
                                        <Button variant="info" block>
                                            Enter
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                ))}
                <div className="mt-10 pagination-position">
                    <PaginationLayout />
                </div>
            </Container>
        );
    }
}