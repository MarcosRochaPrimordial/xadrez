import React from 'react';
import { Provider } from 'react-redux';
import store from './core/store';

import Pages from './pages';

const App = () => <Provider store={store}><Pages /></Provider>;
export default App;