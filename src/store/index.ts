import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import listsApi from '@src/services/lists.service';
import categoriesApi from '@src/services/categories.service';
import listReducer from './lists';

const rootReducer = combineReducers({
  listReducer,
  [listsApi.reducerPath]: listsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...[listsApi.middleware, categoriesApi.middleware]),
});

setupListeners(store.dispatch);
