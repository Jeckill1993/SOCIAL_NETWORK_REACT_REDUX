import { getAuthDataThunkCreator } from './auth_reducer.js';

const SET_INITIALIZED = 'social-network/app/SET-INITIALIZED';
const CHANGE_THEME = 'CHANGE_THEME';

//action creator
export const setInitialized = () => {
    return {
        type: SET_INITIALIZED,
    }
}
export const changeThemeAC = (theme) => {
    return {
        type: CHANGE_THEME,
        theme,
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
    theme: localStorage.getItem('theme') || 'runnyTheme',
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.theme,
            }
        default:
            return state;
    }
}

export default appReducer;