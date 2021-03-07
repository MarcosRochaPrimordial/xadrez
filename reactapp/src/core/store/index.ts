import { createStore, Store } from "redux";
import { LoadingState } from "./ducks/Loading/types";
import { MessagesState } from "./ducks/Messages/types";
import { AlertModalState } from "./ducks/AlertModal/types";
import rootReducer from "./ducks/rootReducer";
import { SearchState } from "./ducks/Search/types";
import { PiecesState } from "./ducks/Pieces/types";

export interface ApplicationState {
    messages: MessagesState,
    loading: LoadingState,
    modal: AlertModalState,
    search: SearchState,
    pieces: PiecesState,
};

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;