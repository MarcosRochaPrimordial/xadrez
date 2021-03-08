import { GameMoveRequest } from "app/domain/dto/GameMoveRequest";
import { GameMove } from "./../../domain/entity/GameMove";
import { BaseRepository } from "./BaseRepository";

export class GameMoveRepository extends BaseRepository {
    constructor() {
        super('game_move');
    }

    public bulkPieces(entities: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.getTableName()} (id, piece_id, spot, d_time, room_id, user_id) VALUES (?)`;
            const promises = [];
            entities.forEach(e => {
                this.Query(query, [e]);
            });
            resolve(true);
        });
    }

    public getPieces(roomId: number): Promise<GameMove[]> {
        return new Promise((resolve, reject) => {
            this.Query<any[]>(`SELECT gm.id
                                    , gm.spot
                                    , p.id piece_id
                                    , p.piece_code
                                    , p.piece_name
                                    , p.colored
                                 FROM game_move gm
                                 JOIN piece p
                                   ON gm.piece_id = p.id
                                WHERE gm.room_id = ?`, [roomId])
                .then((result: any[]) => {
                    resolve(this.mapPieces(result))
                })
                .catch(err => reject(err));
        });
    }

    public setPiecePosition(moveRequest: GameMoveRequest): Promise<number> {
        return new Promise((resolve, reject) => {
            this.Query(`UPDATE game_move
                           SET spot = ?
                             , d_time = CURRENT_TIME()
                         WHERE id = ?
                           AND piece_id = ?
                           AND room_id = ?
                           AND user_id = ?`, [moveRequest.position, moveRequest.id, moveRequest.pieceId, moveRequest.roomId, moveRequest.userId])
                .then((result: any) => {
                    resolve(result.changedRows);
                })
                .catch(err => reject(err));
        })
    }

    private mapPieces(pieces: any[]): GameMove[] {
        return pieces.map(piece => ({
            id: piece.id,
            spot: piece.spot,
            piece: {
                id: piece.piece_id,
                piece_code: piece.piece_code,
                piece_name: piece.piece_name,
                colored: piece.colored
            }
        }) as GameMove);
    }
}