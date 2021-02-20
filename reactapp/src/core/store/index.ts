import { createStore, Store } from "redux";
import { LoadingState } from "./ducks/Loading/types";
import { MessagesState } from "./ducks/Messages/types";
import rootReducer from "./ducks/rootReducer";

export interface ApplicationState {
    messages: MessagesState,
    loading: LoadingState,
};

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;