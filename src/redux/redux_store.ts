import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from './profile_reducer';
import dialogsReducer from './dialogs_reducer';
import UsersReducer from './users_reducer';
import authReducer from './auth_reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app_reducer';
import newsReducer from './news_reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogs: dialogsReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    news: newsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;