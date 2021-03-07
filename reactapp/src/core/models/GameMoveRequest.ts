export interface GameMoveRequest {
    id: number;
    pieceId: number;
    roomId: number;
    position: string;
    userId?: number;
}