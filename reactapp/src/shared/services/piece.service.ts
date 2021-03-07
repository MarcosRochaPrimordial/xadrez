import { GameMove } from "../../core/models/GameMove";
import { GameMoveRequest } from "../../core/models/GameMoveRequest";
import Api from "./api";

class PieceService {
    getPieces(roomId: number) {
        return Api.Get<GameMove[]>(`/piece?roomId=${roomId}`);
    }

    setPiece(move: GameMoveRequest) {
        return Api.Put(`/piece`, move);
    }
}

export default new PieceService();