import { User } from "./User";

export interface Room {
    id: number;
    gameCode?: string;
    playerOne: User;
    playerTwo: User;
    dStart: Date;
}