import { Reducer } from "redux";
import { AlertModalState, AlertModalTypes } from "./types";

const INITIAL_STATE: AlertModalState = {
    alertModal: {
        show: false,
        message: '',
        buttonPrimaryLabel: '',
        buttonSecondaryLabel: '',
        buttonPrimaryAction: () => {},
        buttonSecondaryAction: () => {},
    }
}

const reducer: Reducer<AlertModalState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AlertModalTypes.SHOW:
            return {
                ...state,
                alertModal: {
                    ...action.payload,
                    show: true,
                    prompt: false,
                }
            };
        case AlertModalTypes.HIDE:
            return {
                ...state,
                alertModal: {
                    ...action.payload,
                    show: false,
                }
            };
        case AlertModalTypes.PROMPT:
            return {
                ...state,
                alertModal: {
                    ...action.payload,
                    show: true,
                    prompt: true,
                }
            }
        default:
            return state;
    }
}

export default reducer;