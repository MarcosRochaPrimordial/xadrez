import { Reducer } from "redux";
import { PromptModalState, PromptModalTypes } from "./types";

const INITIAL_STATE: PromptModalState = {
    promptModal: {
        show: false,
        message: '',
        buttonPrimaryLabel: '',
        buttonSecondaryLabel: '',
        buttonPrimaryAction: () => {},
        buttonSecondaryAction: () => {},
    }
}

const reducer: Reducer<PromptModalState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PromptModalTypes.SHOW:
            return {
                ...state,
                promptModal: {
                    ...action.payload,
                    show: true,
                }
            };
        case PromptModalTypes.HIDE:
            return {
                ...state,
                promptModal: {
                    ...action.payload,
                    show: false,
                }
            };
        default:
            return state;
    }
}

export default reducer;