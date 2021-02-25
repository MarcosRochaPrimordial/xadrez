import { combineReducers } from 'redux';

import messages from './Messages';
import loading from './Loading';
import modal from './AlertModal';

export default combineReducers({
    messages,
    loading,
    modal,
});