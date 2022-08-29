import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
} from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './appReducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  sideBar: sidebarReducer,
  userPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  AT
>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// @ts-ignore
window.__store__ = store;
export default store;
