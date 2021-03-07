import { combineReducers } from 'redux';

import messages from './Messages';
import loading from './Loading';
import modal from './AlertModal';
import search from './Search';
import pieces from './Pieces';

export default combineReducers({
    messages,
    loading,
    modal,
    search,
    pieces
});