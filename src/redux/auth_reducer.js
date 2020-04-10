import { usersAPI } from './../API/api.js';

const SET_USER_DATA = 'SET-USER-DATA';

export const setAuthUserData = (userId, login, email) => ({
    type: SET_USER_DATA,
    data: { userId, login, email },
});
export const getAuthDataThunkCreator = () => {
    return (dispatch) => {
        usersAPI.getAuthData().then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserData(id, login, email));
            }
        });
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
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
}

export default authReducer;