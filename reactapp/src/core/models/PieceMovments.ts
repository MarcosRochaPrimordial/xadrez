export interface IPieceMovments {
    [key: string]: (gameMoveId: number, pieceId: number, colPosition: string, rowPosition: number) => void,
}