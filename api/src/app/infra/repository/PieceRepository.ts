import { Piece } from "./../../domain/entity/Piece";
import { BaseRepository } from "./BaseRepository";

export class PieceRepository extends BaseRepository {
    constructor() {
        super('piece');
    }

    getPiece(entities: Piece): Promise<Piece> {
        return new Promise((resolve, reject) => {
            this.Query<Piece[]>(`SELECT * FROM piece WHERE piece_name = ? AND colored = ?`, [entities.piece_name, entities.colored ? 1 : 0])
                .then((result: Piece[]) => {
                    if (!!result.length) {
                        resolve(result[0]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => reject(err));
        });
    }
}