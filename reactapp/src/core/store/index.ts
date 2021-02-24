import { createStore, Store } from "redux";
import { LoadingState } from "./ducks/Loading/types";
import { MessagesState } from "./ducks/Messages/types";
import { PromptModalState } from "./ducks/PromptModal/types";
import rootReducer from "./ducks/rootReducer";

export interface ApplicationState {
    messages: MessagesState,
    loading: LoadingState,
    modal: PromptModalState,
};

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;