import { createStore, combineReducers } from "redux";
import profileReducer from './profile_reducer.js';
import dialogsReducer from './dialogs_reducer.js';
import friendInformationReducer from './friends_information_reducer.js';


let reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    friends_information: friendInformationReducer,
});

let store = createStore(reducers);

export default store;