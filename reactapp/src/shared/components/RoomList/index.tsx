import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Room } from "../../../core/models/Room";
import PaginationLayout from './../PaginationLayout';
import './roomlist.css';
import AlertModal from "../AlertModal";
import * as AlertModalActions from '../../../core/store/ducks/AlertModal/actions';
import * as MessageActions from './../../../core/store/ducks/Messages/actions';
import RoomService from "../../services/room.service";
import { ApplicationState } from "../../../core/store";
import { Search } from "../../../core/store/ducks/Search/types";

interface IState {
    rooms: Room[]
};

interface StateProps {
    search: Search;
};

interface DispatchProps {
    promptShow(message: string,
        buttonPrimaryLabel: string,
        buttonSecondaryLabel: string,
        buttonPrimaryAction: any,
        buttonSecondaryAction: any): void;
    modalHide(): void;
    alertSuccess(message: string): void;
    alertFailure(message: string): void;
    alertWarning(message: string): void;
};

interface OwnProps {
    history: any[];
};

type Props = StateProps & DispatchProps & OwnProps;

class RoomList extends Component<Props, IState> {

    state: IState = {
        rooms: [
            {
                id: 0,
                playerOne: {
                    username: ''
                },
                playerTwo: {
                    username: ''
                },
                dStart: new Date(),
            }
        ]
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.getRooms(0, 10);
    }

    componentDidUpdate(previousProps: Props) {
        if (
            previousProps.search.searchWord !== this.props.search.searchWord
            || ((previousProps.search.searchWord === this.props.search.searchWord)
                && ((previousProps.search.pageStart !== this.props.search.pageStart)
                    && (previousProps.search.pageEnd !== this.props.search.pageEnd)))
        ) {
            this.getRooms(this.props.search.pageStart, this.props.search.pageEnd, this.props.search.searchWord);
        }
    }

    getRooms(startPage: number, endPage: number, searchWord: string = '') {
        RoomService.getRooms(startPage, endPage, searchWord)
            .then(result => {
                if (result.success) {
                    this.setState(state => ({
                        ...state,
                        rooms: result.result,
                    }));
                } else {
                    this.props.alertWarning('There is no game room right now.');
                }
            })
            .catch(err => this.props.alertFailure('An error has occurred. Try again later.'));
    }

    enterRoom(gameCode: string, roomId: number) {
        RoomService.verifyRoomCode(roomId, gameCode)
            .then(result => {
                if (result.success) {
                    this.props.history.push(`/playarea/${roomId}`);
                } else {
                    this.props.alertWarning('Wrong room code');
                }
            })
            .catch(err => this.props.alertFailure('An error has occurred. Try again later.'));
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
                                        <Col xs="12">{room.playerOne.username}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">x</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">{room.playerTwo.username}</Col>
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
                        <PaginationLayout data={this.state.rooms} />
                    </div>
                </Container>
                <AlertModal />
            </>
        );
    }
};

const mapStateToProps = (state: ApplicationState) => ({
    ...state,
    search: state.search.search,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...AlertModalActions, ...MessageActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);