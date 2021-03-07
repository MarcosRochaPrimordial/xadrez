import { PieceRepository } from "./../../infra/repository/PieceRepository";
import { Injectable } from "decorated-router";
import { GameMoveRepository } from "../../infra/repository/GameMoveRepository";
import { GameMove } from "../entity/GameMove";
import INITIAL_POSITION from './../../infra/assets/initial_position';
import { Piece } from "../entity/Piece";
import { RoomDto } from "../dto/RoomDto";
import { Notification } from "./../../application/notification/Notification";
import { GameMoveDto } from "../dto/GameMoveDto";

@Injectable()
export class GameMoveService {

    constructor(
        private gameMoveRepository: GameMoveRepository,
        private pieceRepository: PieceRepository
    ) { }

    setInitialPosition(room: RoomDto) {
        INITIAL_POSITION.forEach(val => {
            let user: number = null;
            if (!val.piece.colored) {
                user = room.playerOne.id;
            } else {
                user = room.playerTwo.id;
            }
            const gameMove: GameMove = {
                id: null,
                piece: {
                    piece_name: val.piece.name,
                    colored: val.piece.colored,
                },
                spot: val.spot,
                d_time: new Date(),
                room_id: room.id,
                user_id: user,
            };
            this.pieceRepository.getPiece(gameMove.piece)
                .then((piece: Piece) => {
                    gameMove.piece.id = piece.id;
                    this.gameMoveRepository.setPieces(gameMove);
                });
        });
    }

    getPieces(roomId: number): Promise<Notification<GameMoveDto[]>> {
        let notification = new Notification<GameMoveDto[]>();
        return this.gameMoveRepository.getPieces(roomId)
            .then((pieces: GameMove[]) => {
                let piecesDto = pieces.map(GameMoveDto.fromEntity);
                return notification.setResult(piecesDto);
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }
}