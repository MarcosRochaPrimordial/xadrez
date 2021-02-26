import { Reducer } from "redux";
import { SearchState, SearchTypes } from "./types";

const INITIAL_STATE: SearchState =  {
    search: {
        searchWord: '',
        pageStart: 0,
        pageEnd: 10,
    },
};

const reducer: Reducer<SearchState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SearchTypes.SEARCH:
            return {
                search: {
                    searchWord: action.payload,
                    pageStart: 0,
                    pageEnd: 10,
                }
            }
        case SearchTypes.PAGINATE:
            return {
                search: {
                    ...state.search,
                    pageStart: action.payload.pageStart,
                    pageEnd: action.payload.pageEnd,
                }
            }
        default:
            return state;
    }
}

export default reducer;