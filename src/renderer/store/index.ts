import {configureStore} from '@reduxjs/toolkit';

import accountBalancesReducer from './accountBalances';
import appReducers from './app';
import bankReducers from './banks';
import configReducers from './config';
import managedAccountBalancesReducer from './managedAccountBalances';
import notificationsReducer from './notifications';
import socketReducers from './sockets';
import validatorReducers from './validators';

const store = configureStore({
  reducer: {
    accountBalances: accountBalancesReducer,
    app: appReducers,
    banks: bankReducers,
    config: configReducers,
    managedAccountBalances: managedAccountBalancesReducer,
    notifications: notificationsReducer,
    sockets: socketReducers,
    validators: validatorReducers,
  },
});

export default store;
