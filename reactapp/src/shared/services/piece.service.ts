import { GameMove } from "../../core/models/GameMove";
import Api from "./api";

class PieceService {
    getPieces(roomId: number) {
        return Api.Get<GameMove[]>(`/piece?roomId=${roomId}`);
    }
}

export default new PieceService();