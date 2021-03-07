import { Piece } from "./Piece";
import { Room } from "./Room"
import { User } from "./User";

export interface GameMove {
    id: number;
    piece: Piece;
    spot: string;
    dTime: Date;
    roomId: Room;
    userId: User;
    allow?: boolean;
}