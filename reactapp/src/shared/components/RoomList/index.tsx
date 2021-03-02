import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
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
import LineRoom from "./LineRoom";
import { usePrevious } from "../../utils/UsePrevious";

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

const RoomList = (props: Props) => {
    const { search } = props;
    const prevSearch = usePrevious<Search>(search);

    useEffect(() => {
        getRooms(0, 10);
    }, []);

    useEffect(() => {
        if (prevSearch &&
            (
                prevSearch.searchWord !== search.searchWord
                || ((prevSearch.searchWord === search.searchWord)
                    && ((prevSearch.pageStart !== search.pageStart)
                        &&prevSearch.pageEnd !== search.pageEnd))
            )
        ) {
            getRooms(search.pageStart, search.pageEnd, search.searchWord);
        }
    }, [search]);

    const [rooms, setRooms] = useState([
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
    ]);

    const getRooms = (startPage: number, endPage: number, searchWord: string = '') => {
        RoomService.getRooms(startPage, endPage, searchWord)
            .then(result => {
                if (result.success) {
                    setRooms(result.result);
                } else {
                    props.alertWarning('There is no game room right now.');
                }
            })
            .catch(err => props.alertFailure('An error has occurred. Try again later.'));
    }

    const enterRoom = (gameCode: string, roomId: number) => {
        RoomService.verifyRoomCode(roomId, gameCode)
            .then(result => {
                if (result.success) {
                    getBackToRoom(roomId);
                } else {
                    props.alertWarning('Wrong room code');
                }
            })
            .catch(err => props.alertFailure('An error has occurred. Try again later.'));
    }

    const openModalGameCode = (roomId: number) => {
        props.promptShow(
            'Enter with the code of the room',
            'Ok',
            'Cancel',
            (gameCode: string) => {
                enterRoom.call(this, gameCode, roomId);
                props.modalHide();
            },
            () => {
                props.modalHide.call(this)
            },
        );
    }

    const getBackToRoom = (roomId: number) => {
        props.history.push(`/playarea/${roomId}`);
    }

    return (
        <>
            <Container>
                {rooms.map(room => (
                    <Card key={room.id} body>
                        <LineRoom room={room} getBackToRoom={getBackToRoom.bind(this)} openModalGameCode={openModalGameCode.bind(this)} />
                    </Card>
                ))}
                <div className="mt-10 pagination-position">
                    <PaginationLayout data={rooms} />
                </div>
            </Container>
            <AlertModal />
        </>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    ...state,
    search: state.search.search,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...AlertModalActions, ...MessageActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);