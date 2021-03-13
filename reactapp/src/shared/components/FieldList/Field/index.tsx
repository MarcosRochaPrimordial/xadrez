import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { FieldModel } from '../../../../core/models/FieldModel';
import { IPieceMovments } from '../../../../core/models/PieceMovments';
import { ApplicationState } from '../../../../core/store';
import UserStorage from '../../../services/user.storage';
import PieceService from './../../../services/piece.service';
import './field.css';
import * as MessageActions from './../../../../core/store/ducks/Messages/actions';
import * as PiecesActions from './../../../../core/store/ducks/Pieces/actions';
import { Room } from '../../../../core/models/Room';

interface StateProps {
    availableHighlightedPosition: Array<string>;
    pieceId?: number;
    gameMoveId?: number;
}

interface DispatchProps {
    alertFailure(message: string): void;
    clearHighlights(): void;
}

interface OwnProps {
    field: FieldModel;
    pieceMovments: IPieceMovments;
    room: Room;
    reload: (room: Room) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const Field = (props: Props) => {
    const { field, pieceMovments, pieceId, gameMoveId, availableHighlightedPosition, room, alertFailure, reload, clearHighlights } = props;
    const [highlight, setHighlight] = useState(false)
    let classElement = 'field';
    if (!!field.move.piece?.pieceCode) {
        classElement = `field-${field.move.piece.pieceCode}-${field.position}`;
        const el = document.querySelector(`.${classElement}`);
        if (el != null) {
            el.innerHTML = `&#${field.move.piece.pieceCode};`;
        }
    } else {
        const elements = document.querySelectorAll(`.${classElement}`);
        if (!!elements.length) {
            elements.forEach(el => {
                el.innerHTML = '';
            });
        }
    }

    const verifyHighlightedPositionAtNewPostion = (position: string): boolean => {
        return availableHighlightedPosition.some(p => p === position);
    }

    useEffect(() => {
        if (verifyHighlightedPositionAtNewPostion(field.position)) {
            setHighlight(true);
        } else {
            setHighlight(false);
        }
        
    });

    const handlePiece = () => {
        if (!!field.move.piece?.pieceCode && field.move.allow) {
            pieceMovments[field.move.piece.pieceName](field.move.id, field.move.piece.id, field.colPosition, field.rowPosition, field.move.piece.colored);
        } else if (!!pieceId && !!gameMoveId) {
            if (verifyHighlightedPositionAtNewPostion(field.position)) {
                PieceService.setPiece({
                    id: gameMoveId,
                    pieceId,
                    position: field.position,
                    roomId: room.id,
                    userId: UserStorage.getUser().id
                })
                .then(result => {
                    if (result.success) {
                        reload(room);
                        clearHighlights();
                    } else {
                        alertFailure('Something went wrong');
                    }
                });
            }
        }
    }

    return (
        <div onClick={handlePiece.bind(this)} className={`field-board ${field.position}`} style={{ backgroundColor: !highlight ? field.color : 'cadetblue' }}>
            <span className={`piece ${classElement} ${field.move.allow ? 'pointer' : 'default'}`}></span>
        </div>
    );
}

const mapStateToProps = ({ pieces }: ApplicationState) => ({
    availableHighlightedPosition: pieces.highlighteds,
    pieceId: pieces.piece,
    gameMoveId: pieces.gameMove,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ ...MessageActions, ...PiecesActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Field);