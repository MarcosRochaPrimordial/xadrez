import { GameMove } from "./../../domain/entity/GameMove";
import { BaseRepository } from "./BaseRepository";

export class GameMoveRepository extends BaseRepository {
    constructor() {
        super('game_move');
    }

    setPieces(entitie: GameMove): void {
        new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.getTableName()} (id, piece_id, spot, d_time, room_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
            this.Query(query, [entitie.id, entitie.piece.id, entitie.spot, entitie.d_time, entitie.room_id, entitie.user_id])
                .then((result: any) => resolve(result))
                .catch(err => reject(err));
        });
    }
}