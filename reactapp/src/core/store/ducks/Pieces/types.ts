/**
 * Action types
 */
export enum PiecesTypes {
    PROVIDE = '@Pieces/PROVIDE',
    CLEAR = '@Pieces/CLEAR',
};

/**
 * State types
 */
export interface PiecesState {
    readonly highlighteds: Array<string>;
    readonly piece?: number;
    readonly gameMove?: number;
}