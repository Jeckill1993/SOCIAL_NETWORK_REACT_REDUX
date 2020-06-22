import {dialogsAPI, ResultCodeEnum} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const GET_DIALOGS = 'social-network/dialogs/GET-DIALOGS';
const SET_DIALOG = 'social-network/dialogs/SET-DIALOG';
const GET_MESSAGES = 'social-network/dialogs/GET-MESSAGES';
const GET_NEW_MESSAGES = 'social-network/dialogs/GET-NEW-MESSAGES';

export type PhotoType = {
    large: string
    small: string
}
export type DialogType = {
    id: number
    userName: string
    hasNewMessages: false
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotoType
}
export type MessageType = {
    addedAt: string
    body: string
    id: number
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
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

type ActionTypes = GetDialogsActionType | SetDialogActionType | GetMessagesActionType | GetNewMessagesActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

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
export const getDialogs = (): ThunkType => {
    return async (dispatch) => {
        let dialogsData = await dialogsAPI.getDialogs();
            dispatch(getDialogsActionCreator(dialogsData));
    }
}
export const startDialog = (userId: number): ThunkType => {
    return async (dispatch) => {
        let startDialogData = await dialogsAPI.startDialog(userId);
        if(startDialogData.resultCode === ResultCodeEnum.Success) {
            dispatch(setDialog(startDialogData.data));
        }
    }
}
export const setMessagesView = (messageId: number): ThunkType => {
    return async (dispatch) => {
        let response = await dialogsAPI.getMessageView(messageId);
    }
}
export const getMessages = (userId: number): ThunkType => {
    return async (dispatch) => {
        let messagesData = await dialogsAPI.getFriendMessages(userId);
        dispatch(getMessagesActionCreator(messagesData.items));
    }
}
export const sendMessage = ({userId, body}:any): ThunkType => {
    return async (dispatch) => {
        let response = await dialogsAPI.sendMessage({userId, body});
        dispatch(getMessages(userId));
    }
}
export const getNewMessages = (): ThunkType => {
    return async (dispatch) => {
        let response = await dialogsAPI.getNewMessages();
        dispatch(getNewMessagesActionCreator(response));
    }
}

type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>,
    newMessagesCount: number,
    currentDialog: object
}
let initialState = {
    dialogs: [],
    messages:[],
    newMessagesCount: 0,
    currentDialog: {}
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

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