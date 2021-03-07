import { Reducer } from "redux";
import { PiecesState, PiecesTypes } from "./types";

const INITIAL_STATE: PiecesState = {
    highlighteds: [],
    piece: undefined,
    gameMove: undefined,
}

const reducer: Reducer<PiecesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PiecesTypes.PROVIDE:
            return {
                highlighteds: action.payload.availableHighlighteds,
                piece: action.payload.piece,
                gameMove: action.payload.gameMove,
            }
        case PiecesTypes.CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default reducer;