import { getAuthDataThunkCreator } from './auth_reducer';

const SET_INITIALIZED: string = 'social-network/app/SET-INITIALIZED';
const CHANGE_THEME: string = 'social-network/app/CHANGE_THEME';

//action creator
type InitializedActionType = {
    type: typeof SET_INITIALIZED
}

export const setInitialized = (): InitializedActionType => {
    return {
        type: SET_INITIALIZED,
    }
}

type ChangeThemeActionType = {
    type: typeof CHANGE_THEME
    theme: string
}
export const changeThemeAC = (theme: string): ChangeThemeActionType => {
    return {
        type: CHANGE_THEME,
        theme,
    }
}

//thunk creator, side effect
export const initialize = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthDataThunkCreator());
        promise.then(() => {
            dispatch(setInitialized());
        })
    }
}

type InitialStateType = {
    initialized: boolean
    theme: string
}
let initialState = {
    initialized: false,
    theme: localStorage.getItem('theme') || 'runnyTheme',
}

//тип возвращаемого значения пишется перед стрелкой (если функция стрелочная)
const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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