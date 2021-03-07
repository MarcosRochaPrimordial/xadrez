import { action } from "typesafe-actions";
import { PiecesTypes } from "./types";

export const provideHighlights = (gameMoveId: number, pieceId: number, availableHighlighteds: Array<string>) => action(PiecesTypes.PROVIDE, { availableHighlighteds, piece: pieceId, gameMove: gameMoveId });
export const clearHighlights = () => action(PiecesTypes.CLEAR);