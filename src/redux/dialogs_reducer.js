import {dialogsAPI} from "../API/api";

const GET_DIALOGS = 'social-network/dialogs/GET-DIALOGS';
const SET_DIALOG = 'social-network/dialogs/SET-DIALOG';
const GET_MESSAGES = 'social-network/dialogs/GET-MESSAGES';
const GET_NEW_MESSAGES = 'social-network/dialogs/GET-NEW-MESSAGES';


//action creator
export const getDialogsActionCreator = (dialogs) => {
    return {
        type: GET_DIALOGS,
        dialogs,
    }
}
export const setDialog = (dialog) => {
    return {
        type: SET_DIALOG,
        dialog,
    }
}
export const getMessagesActionCreator = (messages) => {
    return {
        type: GET_MESSAGES,
        messages,
    }
}
export const getNewMessagesActionCreator = (newMessagesCount) => {
    return {
        type: GET_NEW_MESSAGES,
        newMessagesCount,
    }
}


//thunk creator
export const getDialogs = () => {
    return async (dispatch) => {
        let response = await dialogsAPI.getDialogs();
            dispatch(getDialogsActionCreator(response));
    }
}
export const startDialog = (userId) => {
    return async (dispatch) => {
        let response = await dialogsAPI.startDialog(userId);
        if(response.resultCode === 0) {
            dispatch(setDialog(response.data));
        }
    }
}
export const setMessagesView = (messageId) => {
    return async (dispatch) => {
        let response = await dialogsAPI.getMessageView(messageId);
    }
}
export const getMessages = (userId) => {
    return async (dispatch) => {
        let response = await dialogsAPI.getFriendMessages(userId);
        dispatch(getMessagesActionCreator(response.items));
    }
}
export const sendMessage = ({userId, body}) => {
    return async (dispatch) => {
        let response = await dialogsAPI.sendMessage({userId, body});
        dispatch(getMessages(userId));
    }
}
export const getNewMessages = () => {
    return async (dispatch) => {
        let response = await dialogsAPI.getNewMessages();
        dispatch(getNewMessagesActionCreator(response));
    }
}



let initialState = {
    dialogs: [],
    messages:[],
    newMessagesCount: 0,
    currentDialog: {}
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_DIALOGS:
            return {
                ...state,
                dialogs: action.dialogs,
            }
        case SET_DIALOG: {
            return {
                ...state,
                currentDialog: action.dialog,
            }
        }
        case GET_MESSAGES: {
            return {
                ...state,
                messages: action.messages,
            }
        }
        case GET_NEW_MESSAGES: {
            return {
                ...state,
                newMessagesCount: action.newMessagesCount,
            }
        }
        default:
            return state;
    }
}

export default dialogsReducer;