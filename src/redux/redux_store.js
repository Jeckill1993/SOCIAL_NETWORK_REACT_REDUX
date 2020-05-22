import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from './profile_reducer.js';
import dialogsReducer from './dialogs_reducer.js';
import friendInformationReducer from './friends_information_reducer.js';
import UsersReducer from './users_reducer.js';
import authReducer from "./auth_reducer.js";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app_reducer.js";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogs: dialogsReducer,
    friends_information: friendInformationReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;