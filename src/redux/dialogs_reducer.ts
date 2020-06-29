import {ResultCodeEnum} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";
import {dialogsAPI} from "../API/dialogs-api";


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

type ActionTypes = InferActionTypes<typeof dialogsActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const dialogsActions = {
    getDialogsActionCreator: (dialogs: Array<DialogType>) => {
        return {
            type: 'social-network/dialogs/GET-DIALOGS',
            dialogs,
        }as const
    },
    setDialog: (dialog: object) => {
        return {
            type: 'social-network/dialogs/SET-DIALOG',
            dialog,
        }as const
    },
    getMessagesActionCreator: (messages: Array<MessageType>) => {
        return {
            type: 'social-network/dialogs/GET-MESSAGES',
            messages,
        }as const
    },
    getNewMessagesActionCreator: (newMessagesCount: number) => {
        return {
            type: 'social-network/dialogs/GET-NEW-MESSAGES',
            newMessagesCount,
        }as const
    },

}


//thunk creator
export const getDialogs = (): ThunkType => {
    return async (dispatch) => {
        let dialogsData = await dialogsAPI.getDialogs();
            dispatch(dialogsActions.getDialogsActionCreator(dialogsData));
    }
}
export const startDialog = (userId: number): ThunkType => {
    return async (dispatch) => {
        let startDialogData = await dialogsAPI.startDialog(userId);
        if(startDialogData.resultCode === ResultCodeEnum.Success) {
            dispatch(dialogsActions.setDialog(startDialogData.data));
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
        dispatch(dialogsActions.getMessagesActionCreator(messagesData.items));
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
        dispatch(dialogsActions.getNewMessagesActionCreator(response));
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
        case "social-network/dialogs/GET-DIALOGS":
            return {
                ...state,
                dialogs: action.dialogs,
            }
        case "social-network/dialogs/SET-DIALOG": {
            return {
                ...state,
                currentDialog: action.dialog,
            }
        }
        case "social-network/dialogs/GET-MESSAGES": {
            return {
                ...state,
                messages: action.messages,
            }
        }
        case "social-network/dialogs/GET-NEW-MESSAGES" : {
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