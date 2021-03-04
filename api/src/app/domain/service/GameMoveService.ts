import { PieceRepository } from "./../../infra/repository/PieceRepository";
import { Injectable } from "decorated-router";
import { GameMoveRepository } from "../../infra/repository/GameMoveRepository";
import { GameMove } from "../entity/GameMove";
import INITIAL_POSITION from './../../infra/assets/initial_position';
import { Piece } from "../entity/Piece";

@Injectable()
export class GameMoveService {

    constructor(
        private gameMoveRepository: GameMoveRepository,
        private pieceRepository: PieceRepository
    ) { }

    setInitialPosition(userId: number, roomId: number) {
        INITIAL_POSITION.forEach(val => {
            const gameMove: GameMove = {
                id: null,
                piece: {
                    piece_name: val.piece.name,
                    colored: val.piece.colored,
                },
                spot: val.spot,
                d_time: new Date(),
                room_id: roomId,
                user_id: userId,
            };
            this.pieceRepository.getPiece(gameMove.piece)
                .then((piece: Piece) => {
                    gameMove.piece.id = piece.id;
                    this.gameMoveRepository.setPieces(gameMove);
                });
        });
    }
}