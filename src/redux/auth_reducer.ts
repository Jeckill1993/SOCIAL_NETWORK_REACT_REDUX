import { authAPI } from '../API/api.js';
import { stopSubmit } from 'redux-form';  //this is action creator, was created redux-form developers

const SET_USER_DATA: string = 'social-network/auth/SET-USER-DATA';

//action creator
type setAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth },
});

//thunk creator, side effect
export const getAuthDataThunkCreator = () => {
    return async (dispatch: any) => {
        let data = await authAPI.me();
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(setAuthUserData(id, login, email, true));
            return id;
        }
    }
}
export const setMyLoginDataThunkCreator = (data: any) => {
    return async (dispatch: any) => {
        let response = await authAPI.login(data);
        if (response.data.resultCode === 0) {
            dispatch(getAuthDataThunkCreator());
        } else {
            let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
            dispatch(stopSubmit("login", { _error: messageError }));
        }
    }
}
export const logOutThunkCreator = () => {
    return async (dispatch: any) => {
        let response = await authAPI.logOut();
            if (response.data.resultCode === 0) {
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

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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