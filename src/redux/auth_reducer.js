import { authAPI } from './../API/api.js';
import { stopSubmit } from 'redux-form';  //this is action creator, was created redux-form developers

const SET_USER_DATA = 'SET-USER-DATA';


export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuth },
});

export const getAuthDataThunkCreator = () => {
    return async (dispatch) => {
        let data = await authAPI.me();
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(setAuthUserData(id, login, email, true));
        }
    }
}
export const setMyLoginDataThunkCreator = (data) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
        let data = await authAPI.logOut();
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
    }
}

let initialState = {
    userId: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
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