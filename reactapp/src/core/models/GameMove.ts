import { Piece } from "./Piece";
import { Room } from "./Room"
import { User } from "./User";

export interface GameMove {
    id: number;
    piece: Piece;
    spot: string;
    killed: boolean;
    dTime: Date;
    roomId: Room;
    userId: User;
    allow?: boolean;
}