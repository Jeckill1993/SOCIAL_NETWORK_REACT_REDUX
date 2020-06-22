import {authAPI, ResultCodeEnum} from '../API/api';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";
import {stopSubmit} from "redux-form"; //this is action creator, was created redux-form developers

const SET_USER_DATA: string = 'social-network/auth/SET-USER-DATA';

//action creator
type setAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
export type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, setAuthUserDataActionType>

export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth },
});

//thunk creator, side effect
type AuthFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
export const getAuthDataThunkCreator = (): ThunkType => {
    // @ts-ignore
    return async (dispatch) => {
        let authData = await authAPI.me();
        if (authData.resultCode === ResultCodeEnum.Success) {
            let { id, login, email } = authData.data;
            dispatch(setAuthUserData(id, login, email, true));
            return id;
        }
    }
}
export const setMyLoginDataThunkCreator = (data: AuthFormDataType): ThunkType => {
    return async (dispatch) => {
        let loginData = await authAPI.login(data);
        if (loginData.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthDataThunkCreator());
        } else {
            let messageError = loginData.messages.length > 0 ? loginData.messages[0] : 'some error';
            // @ts-ignore
            dispatch(stopSubmit("login", { _error: messageError }));
        }
    }
}
export const logOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let logOutData = await authAPI.logOut();
            if (logOutData.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }
}

export type InitialStateType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    isFetching: boolean
}

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false,
}

const authReducer = (state: InitialStateType = initialState, action: setAuthUserDataActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export default authReducer;