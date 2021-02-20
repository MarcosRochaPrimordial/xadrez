import { combineReducers } from 'redux';

import messages from './Messages';
import loading from './Loading';

export default combineReducers({
    messages,
    loading,
});