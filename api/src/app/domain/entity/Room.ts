import { User } from "./User";

export class Room {
    id: number = null;
    game_code: string;
    player_one: User;
    player_one_id: number;
    player_two: User;
    player_two_id: number;
    d_start: Date;
}