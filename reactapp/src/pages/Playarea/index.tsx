import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Col, FieldModel, Row } from "../../core/models/FieldModel";
import { GameMove } from "../../core/models/GameMove";
import { IPieceMovments } from "../../core/models/PieceMovments";
import { Room } from "../../core/models/Room";
import FieldList from '../../shared/components/FieldList';
import Header from "../../shared/components/Header";
import PieceService from "../../shared/services/piece.service";
import RoomService from "../../shared/services/room.service";
import UserStorage from "../../shared/services/user.storage";
import * as MessageActions from './../../core/store/ducks/Messages/actions';
import * as PieceActions from './../../core/store/ducks/Pieces/actions';
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

function findPiece(moves: GameMove[], colPosition: string) {
    return moves.find(p => p.spot === colPosition);
}

function buildBoard(playerOne: boolean, pieces: GameMove[]) {
    let colList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    if (!playerOne) {
        colList.reverse();
    }
    let buildedBoard: Row[] = new Array(8).fill({});
    buildedBoard = buildedBoard.map((row, key) => {
        let index = key;
        if (playerOne) {
            index = (buildedBoard.length - 1) - key;
        }
        let columns: Col[] = new Array(8).fill({});
        const rowLocation = index + 1;
        columns = columns.map((col, ikey) => {
            const colPosition = `${colList[ikey]}${rowLocation}`;
            const move = findPiece(pieces, colPosition);
            return {
                colLocation: colList[ikey],
                field: {
                    color: fieldColor(key, ikey),
                    position: colPosition,
                    colPosition: colList[ikey],
                    rowPosition: rowLocation,
                    move: {
                        ...move,
                        allow: playerOne ? !move?.piece.colored : move?.piece.colored,
                    }
                } as FieldModel
            } as Col
        });
        return {
            rowLocation,
            cols: columns
        } as Row;
    });
    return buildedBoard;
}

interface DispatchProps {
    alertFailure(message: string): void;
    provideHighlights(gameMove: number, piece: number, availableHighlighteds: Array<string>): void;
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
    const { history, alertFailure, provideHighlights, match } = props;
    const loggedUserId = UserStorage.getUser().id;
    const [playerOne, setPlayerOne]: [boolean, Function] = useState(true);
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
    const pieceMovments: IPieceMovments =  {
        PAWN: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => {
            let newPos: Array<number> = [];
            if (playerOne) {
                newPos.push(rowPosition + 1);
                if (rowPosition == 2) {
                    newPos.push(rowPosition + 2);
                }
            } else {
                newPos.push(rowPosition - 1);
                if (rowPosition == 7) {
                    newPos.push(rowPosition - 2);
                }
            }
            provideHighlights(gameMoveId, pieceId, newPos.map(p => colPosition + p.toString()));
        },
        ROOK: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => console.log('I am a ROOK at ' + colPosition + rowPosition),
        BISHOP: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => console.log('I am a BISHOP at ' + colPosition + rowPosition),
        KNIGHT: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => console.log('I am a KNIGHT at ' + colPosition + rowPosition),
        QUEEN: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => console.log('I am a QUEEN at ' + colPosition + rowPosition),
        KING: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => console.log('I am a KING at ' + colPosition + rowPosition),
    }

    const removePlayerFromRoom = () => {
        alertFailure('Not available');
        history.push('/');
    }

    const generateBoard = (room: Room, pieces: GameMove[], loggedUserId?: number) => {
        let p1 = true;
        if (loggedUserId === room.playerOne.id) {
            p1 = true;
        } else if (loggedUserId === room.playerTwo.id) {
            p1 = false;
        } else {
            removePlayerFromRoom();
        }
        setPlayerOne(p1);
        setChessBoard(buildBoard(p1, pieces));
    }

    const getPieces = (room: Room) => {
        PieceService.getPieces(match.params.id)
        .then((resultPieces) => {
            generateBoard(room, resultPieces.result, loggedUserId);
        });
    }

    useEffect(() => {
        RoomService.getRoomAndApply(match.params.id, loggedUserId)
            .then((resultRoom) => {
                if (resultRoom.success && resultRoom.result !== null) {
                    setRoom(resultRoom.result);
                    getPieces(resultRoom.result);
                } else {
                    removePlayerFromRoom();
                }
            });
    }, []);

    return (
        <div>
            {room.id !== 0 && (
                <>
                    <Header history={history} gameCode={room.gameCode} />
                    <div className="chess-board">
                        {chessBoard.map(i => (
                            <FieldList key={i.rowLocation} fields={i.cols} pieceMovments={pieceMovments} room={room} reload={getPieces.bind(this)} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...MessageActions, ...PieceActions }, dispatch);

export default connect(null, mapDispatchToProps)(Playarea);