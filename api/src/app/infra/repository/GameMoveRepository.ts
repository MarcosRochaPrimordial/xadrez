import { GameMove } from "./../../domain/entity/GameMove";
import { BaseRepository } from "./BaseRepository";

export class GameMoveRepository extends BaseRepository {
    constructor() {
        super('game_move');
    }

    public setPieces(entitie: GameMove): void {
        new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.getTableName()} (id, piece_id, spot, d_time, room_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
            this.Query(query, [entitie.id, entitie.piece.id, entitie.spot, entitie.d_time, entitie.room_id, entitie.user_id])
                .then((result: any) => resolve(result))
                .catch(err => reject(err));
        });
    }

    public getPieces(roomId: number): Promise<GameMove[]> {
        return new Promise((resolve, reject) => {
            this.Query<any[]>(`SELECT gm.id
                                    , gm.spot
                                    , p.id piece_id
                                    , p.piece_code
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

    private mapPieces(pieces: any[]): GameMove[] {
        return pieces.map(piece => ({
            id: piece.id,
            spot: piece.spot,
            piece: {
                id: piece.piece_id,
                piece_code: piece.piece_code
            }
        }) as GameMove);
    }
}