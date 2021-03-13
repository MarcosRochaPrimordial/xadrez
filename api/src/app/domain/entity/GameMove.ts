import { Piece } from "./Piece";
import { Room } from "./Room";
import { User } from "./User";

export class GameMove {
    id?: number;
    piece_id?: number;
    piece: Piece;
    spot: string;
    killed: boolean;
    d_time: Date;
    room_id: number;
    room?: Room;
    user_id: number;
    user?: User;
};