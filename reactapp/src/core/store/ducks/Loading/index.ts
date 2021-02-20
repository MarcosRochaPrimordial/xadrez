import { Reducer } from 'redux';
import { LoadingState, LoadingTypes } from './types';

const INITIAL_STATE: LoadingState = {
    show: false,
};

const reducer: Reducer<LoadingState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoadingTypes.SHOW:
            return {
                ...state,
                show: true,
            };
        case LoadingTypes.HIDE:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
}

export default reducer;