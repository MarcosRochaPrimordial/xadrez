export interface Room {
    id?: number;
    gameCode?: string;
    playerOneUsername: string;
    playerTwoUsername: string;
    start: Date;
}