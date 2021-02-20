import { Reducer } from 'redux';
import { MessagesState, MessagesTypes, Variant } from './types';

const INITIAL_STATE: MessagesState = {
    messages: [],
};

const reducer: Reducer<MessagesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessagesTypes.SUCCESS:
            state.messages.push({
                id: new Date().getTime(),
                message: action.payload,
                type: Variant.SUCCESS,
            });
            return {
                ...state,
                messages: [...state.messages],
            };
        case MessagesTypes.FAILURE:
            state.messages.push({
                id: new Date().getTime(),
                message: action.payload,
                type: Variant.FAILURE,
            });
            return {
                ...state,
                messages: [...state.messages],
            };
        case MessagesTypes.WARNING:
            state.messages.push({
                id: new Date().getTime(),
                message: action.payload,
                type: Variant.WARNING,
            });
            return {
                ...state,
                messages: [...state.messages],
            };
        default:
            return state;
    }
};

export default reducer;