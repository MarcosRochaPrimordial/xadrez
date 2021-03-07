import { GameMove } from "./GameMove";

export interface Row {
    rowLocation: number;
    cols: Col[];
};

export interface Col {
    colLocation: string;
    field: FieldModel;
};

export interface FieldModel {
    color: string;
    position: string;
    colPosition: string;
    rowPosition: number;
    move: GameMove;
};