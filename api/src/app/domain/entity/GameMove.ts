import { Piece } from "./Piece";
import { Room } from "./Room";
import { User } from "./User";

export interface GameMove {
    id?: number;
    piece_id?: number;
    piece: Piece;
    spot: string;
    d_time: Date;
    room_id: number;
    room?: Room;
    user_id: number;
    player?: User;
};