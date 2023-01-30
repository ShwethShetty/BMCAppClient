import { configureStore } from '@reduxjs/toolkit'
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// const middlewares=[logger];
// rootReducer,applyMiddleware(...middlewares)

export const store=configureStore({reducer:rootReducer,middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)});

export const persistor=persistStore(store);

// eslint-disable-next-line
export default {store,persistor};