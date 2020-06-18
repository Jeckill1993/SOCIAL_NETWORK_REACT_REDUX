import {dialogsAPI} from "../API/api";

const GET_DIALOGS = 'social-network/dialogs/GET-DIALOGS';
const SET_DIALOG = 'social-network/dialogs/SET-DIALOG';
const GET_MESSAGES = 'social-network/dialogs/GET-MESSAGES';
const GET_NEW_MESSAGES = 'social-network/dialogs/GET-NEW-MESSAGES';

export type PhotoType = {
    large: string
    small: string
}
export type DialogType = {
    userName: string
    id: number
    photos: PhotoType
}
export type MessageType = {
    id: number
    body: string
}

//action creator
type GetDialogsActionType = {
    type: typeof GET_DIALOGS
    dialogs: Array<DialogType>
}
type SetDialogActionType = {
    type: typeof SET_DIALOG
    dialog: object
}
type GetMessagesActionType = {
    type: typeof GET_MESSAGES
    messages: Array<MessageType>
}
type GetNewMessagesActionType = {
    type: typeof GET_NEW_MESSAGES
    newMessagesCount: number
}

export const getDialogsActionCreator = (dialogs: Array<DialogType>): GetDialogsActionType => {
    return {
        type: GET_DIALOGS,
        dialogs,
    }
}
export const setDialog = (dialog: object): SetDialogActionType => {
    return {
        type: SET_DIALOG,
        dialog,
    }
}
export const getMessagesActionCreator = (messages: Array<MessageType>): GetMessagesActionType => {
    return {
        type: GET_MESSAGES,
        messages,
    }
}
export const getNewMessagesActionCreator = (newMessagesCount: number): GetNewMessagesActionType => {
    return {
        type: GET_NEW_MESSAGES,
        newMessagesCount,
    }
}

//thunk creator
export const getDialogs = () => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.getDialogs();
            dispatch(getDialogsActionCreator(response));
    }
}
export const startDialog = (userId: number) => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.startDialog(userId);
        if(response.resultCode === 0) {
            dispatch(setDialog(response.data));
        }
    }
}
export const setMessagesView = (messageId: number) => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.getMessageView(messageId);
    }
}
export const getMessages = (userId: number) => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.getFriendMessages(userId);
        dispatch(getMessagesActionCreator(response.items));
    }
}
export const sendMessage = ({userId, body}:any) => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.sendMessage({userId, body});
        dispatch(getMessages(userId));
    }
}
export const getNewMessages = () => {
    return async (dispatch: any) => {
        let response = await dialogsAPI.getNewMessages();
        dispatch(getNewMessagesActionCreator(response));
    }
}

type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<object>,
    newMessagesCount: number,
    currentDialog: object
}
let initialState = {
    dialogs: [],
    messages:[],
    newMessagesCount: 0,
    currentDialog: {}
}

const dialogsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {

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