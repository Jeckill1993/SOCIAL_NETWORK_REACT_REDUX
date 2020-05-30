import { getAuthDataThunkCreator } from './auth_reducer.js';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';

//action creator
export const setInitialized = () => {
    return {
        type: SET_INITIALIZED,
    }
} 

//thunk creator, side effect
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
    theme: 'runnyTheme',
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