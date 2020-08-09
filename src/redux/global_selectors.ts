import {AppStateType} from "./redux_store";

export const getTheme = (state: AppStateType) => {
    return state.app.theme
}
