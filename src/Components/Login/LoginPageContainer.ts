import { connect } from 'react-redux';
import { setMyLoginDataThunkCreator } from '../../redux/auth_reducer';
import LoginPage from './LoginPage';
import {AppStateType} from "../../redux/redux_store";

type MapStatePropsType = {
    userId: number | null
    isAuth: boolean
    theme: string
}
type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type MapDispatchPropsType = {
    setMyLoginData: (loginData: LoginFormDataType) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        theme: state.app.theme,
    }
}

const LoginPageContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { setMyLoginData: setMyLoginDataThunkCreator })(LoginPage);

export default LoginPageContainer;