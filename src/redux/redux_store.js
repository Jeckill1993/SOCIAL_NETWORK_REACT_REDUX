import { createStore, combineReducers } from "redux";
import profileReducer from './profile_reducer.js';
import dialogsReducer from './dialogs_reducer.js';
import friendInformationReducer from './friends_information_reducer.js';
import UsersReducer from './users_reducer.js';


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogs: dialogsReducer,
    friends_information: friendInformationReducer,
    usersPage: UsersReducer,
});

let store = createStore(reducers);

export default store;