import {getAuthDataThunkCreator, setAuthUserDataActionType} from './auth_reducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const SET_INITIALIZED: string = 'social-network/app/SET-INITIALIZED';
const CHANGE_THEME: string = 'social-network/app/CHANGE_THEME';

//action creator
type InitializedActionType = {
    type: typeof SET_INITIALIZED
}
type ChangeThemeActionType = {
    type: typeof CHANGE_THEME
    theme: string
}

type ActionTypes = InitializedActionType | ChangeThemeActionType | setAuthUserDataActionType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const setInitialized = (): InitializedActionType => {
    return {
        type: SET_INITIALIZED,
    }
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
const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        case CHANGE_THEME:
            return {
                ...state,
                // @ts-ignore
                theme: action.theme,
            }
        default:
            return state;
    }
}

export default appReducer;