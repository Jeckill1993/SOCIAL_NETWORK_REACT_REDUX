import { connect } from 'react-redux';
import { setMyLoginDataThunkCreator } from '../../redux/auth_reducer';
import LoginPage from './LoginPage';
import {AppStateType} from "../../redux/redux_store";

type MapStatePropsType = {
    userId: number | null
    isAuth: boolean
    theme: string
}
type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type MapDispatchPropsType = {
    setMyLoginData: (formData: LoginDataType) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        theme: state.app.theme,
    }
}
// @ts-ignore
const LoginPageContainer = connect<MapStatePropsType & MapDispatchPropsType, AppStateType>(mapStateToProps, { setMyLoginData: setMyLoginDataThunkCreator })(LoginPage);
// @ts-ignore
export default LoginPageContainer;