import { DataObject } from "decorated-router";

@DataObject()
export class PieceDto {
    id?: number;
    colored: boolean;
    pieceName: string;
    pieceCode?: string;
}