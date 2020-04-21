import { authAPI } from './../API/api.js';
import { getAuthDataThunkCreator } from './auth_reducer.js';

const SET_INITIALIZED = 'SET-INITIALIZED';

export const setInitialized = () => {
    return {
        type: SET_INITIALIZED,
    }
} 

export const initialize = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthDataThunkCreator());
        promise.then(() => {
            dispatch(setInitialized());
        })
    }
}

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

export default appReducer;