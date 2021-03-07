export interface GameMoveRequest {
    id: number;
    pieceId: number;
    roomId: number;
    userId: number;
    position: string;
}