import { PieceRepository } from "./../../infra/repository/PieceRepository";
import { Injectable } from "decorated-router";
import { GameMoveRepository } from "../../infra/repository/GameMoveRepository";
import { GameMove } from "../entity/GameMove";
import INITIAL_POSITION from './../../infra/assets/initial_position';
import { Piece } from "../entity/Piece";
import { RoomDto } from "../dto/RoomDto";
import { Notification } from "./../../application/notification/Notification";
import { GameMoveDto } from "../dto/GameMoveDto";
import { GameMoveRequest } from "../dto/GameMoveRequest";

@Injectable()
export class GameMoveService {

    constructor(
        private gameMoveRepository: GameMoveRepository,
        private pieceRepository: PieceRepository
    ) { }

    public async setInitialPosition(room: RoomDto): Promise<boolean> {
        const gameMoves: any[] = [];
        for (let i = 0; i < INITIAL_POSITION.length; i = i + 1) {
            const val = INITIAL_POSITION[i];
            let user: number = null;
            if (!val.piece.colored) {
                user = room.playerOne.id;
            } else {
                user = room.playerTwo.id;
            }
            const piece = await this.pieceRepository.getPiece({ piece_name: val.piece.name, colored: val.piece.colored });
            gameMoves.push([null, piece.id, val.spot, false, new Date(), room.id, user]);
        }
        return new Promise((resolve, reject) => {
            this.gameMoveRepository.beginTransaction()
                .then(() => {
                    this.gameMoveRepository.bulkPieces(gameMoves)
                        .then(() => {
                            this.gameMoveRepository.commit();
                            resolve(true);
                        })
                        .catch(err => {
                            this.gameMoveRepository.rollback();
                            reject(err);
                        });
                })
                .catch(err => {
                    this.gameMoveRepository.rollback();
                    reject(err);
                });
        })
    }

    public getPieces(roomId: number): Promise<Notification<GameMoveDto[]>> {
        let notification = new Notification<GameMoveDto[]>();
        return this.gameMoveRepository.getPieces(roomId)
            .then((pieces: GameMove[]) => {
                let piecesDto = pieces.map(GameMoveDto.fromEntity);
                return notification.setResult(piecesDto);
            })
            .catch(err => notification.addError('An error has occurred').Success(false));
    }

    public setPiece(moveRequest: GameMoveRequest): Promise<Notification> {
        let notification = new Notification();
        return new Promise(resolve => {
            this.gameMoveRepository.beginTransaction()
                .then(() => {
                    this.gameMoveRepository.killPiece(moveRequest)
                        .then(() => {
                            this.gameMoveRepository.setPiecePosition(moveRequest)
                                .then((changedRows) => {
                                    if (changedRows === 1) {
                                        resolve(notification.Success());
                                    } else {
                                        resolve(notification.addError('Something went wrong'));
                                    }
                                });
                        });
                })
                .catch(err => {
                    this.gameMoveRepository.rollback();
                    resolve(notification.addError('An error has occurred').Success(false));
                });
        })
    }
}