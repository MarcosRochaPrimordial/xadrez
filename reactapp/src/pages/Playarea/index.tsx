import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Col, FieldModel, Row } from "../../core/models/FieldModel";
import { Room } from "../../core/models/Room";
import FieldList from '../../shared/components/FieldList';
import Header from "../../shared/components/Header";
import RoomService from "../../shared/services/room.service";
import UserStorage from "../../shared/services/user.storage";
import * as MessageActions from './../../core/store/ducks/Messages/actions';
import './playarea.css';

function fieldColor(rowIndex: number, colIndex: number) {
    if (rowIndex % 2 !== 0) {
        if (colIndex % 2 !== 0) {
            return '#FFF';
        } else {
            return '#AD6C1C';
        }
    } else {
        if (colIndex % 2 !== 0) {
            return '#AD6C1C';
        } else {
            return '#FFF';
        }
    }
}

function buildBoard(playerOne: boolean) {
    let colList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    if (!playerOne) {
        colList = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    }
    let buildedBoard: Row[] = new Array(8).fill({});
    buildedBoard = buildedBoard.map((row, key) => {
        let index = key;
        if (playerOne) {
            index = (buildedBoard.length - 1) - key;
        }
        let columns: Col[] = new Array(8).fill({});
        const rowLocation = index + 1;
        columns = columns.map((col, ikey) => ({
            colLocation: colList[ikey],
            field: {
                color: fieldColor(index, ikey),
                position: `${colList[ikey]}${rowLocation}`
            } as FieldModel
        } as Col));
        return {
            rowLocation,
            cols: columns
        } as Row;
    });
    return buildedBoard;
}

interface DispatchProps {
    alertFailure(message: string): void;
}

interface OwnProps {
    match: {
        params: {
            id: number,
        }
    },
    history: any,
};

type Props = DispatchProps & OwnProps;

const Playarea = (props: Props) => {
    const { history, alertFailure } = props;
    const [chessBoard, setChessBoard]: [Row[], Function] = useState([]);
    const [room, setRoom]: [Room, Function] = useState({
        id: 0,
        gameCode: '',
        playerOne: {
            username: ''
        },
        playerTwo: {
            username: ''
        },
        dStart: new Date(),
    });

    const removePlayerFromRoom = () => {
        alertFailure('Not available');
        history.push('/');
    }

    const generateBoard = (room: Room, loggedUserId?: number) => {
        if (loggedUserId === room.playerOne.id) {
            setChessBoard(buildBoard(true));
        } else if (loggedUserId === room.playerTwo.id) {
            setChessBoard(buildBoard(false));
        } else {
            removePlayerFromRoom();
        }
    }

    useEffect(() => {
        const { match } = props;
        const loggedUserId = UserStorage.getUser().id;
        RoomService.getRoomAndApply(match.params.id, loggedUserId)
            .then(result => {
                if (result.success && result.result !== null) {
                    setRoom(result.result);
                    generateBoard(result.result, loggedUserId);
                } else {
                    removePlayerFromRoom();
                }
            })
    }, []);

    return (
        <div>
            {room.id !== 0 && (
                <>
                    <Header history={history} gameCode={room.gameCode} />
                    <div className="chess-board">
                        {chessBoard.map(i => (
                            <FieldList key={i.rowLocation} fields={i.cols} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...MessageActions }, dispatch);

export default connect(null, mapDispatchToProps)(Playarea);