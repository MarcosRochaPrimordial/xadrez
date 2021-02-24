import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Room } from "../../../core/models/Room";
import PaginationLayout from './../PaginationLayout';
import './roomlist.css';

const RoomList = (props: any) => {

    const [rooms, setRooms] = useState([
        {
            id: 1,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
            gameCode: '',
        },
        {
            id: 2,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
            gameCode: '',
        },
        {
            id: 3,
            playerOneUsername: 'Teste 1',
            playerTwoUsername: 'Teste 2',
            start: new Date(),
            gameCode: '',
        }
    ]);

    const changeGameCode = (value: string, index: number) => {
        rooms[index].gameCode = value;
        setRooms(rooms);
    }

    return (
        <Container>
            {rooms.map((room, index) => (
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
                                    <Form.Control placeholder="Room Code" type="text" value={room.gameCode} onChange={event => changeGameCode(event.target.value, index)}></Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col xs="12">
                                    <Button disabled={!room.gameCode} variant="info" block>
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
};

export default RoomList;