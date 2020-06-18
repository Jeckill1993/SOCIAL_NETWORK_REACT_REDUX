import { connect } from 'react-redux';
import { setMyLoginDataThunkCreator } from '../../redux/auth_reducer';
import LoginPage from './LoginPage';

let mapStateTpProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        theme: state.app.theme,
    }
}
const LoginPageContainer = connect(mapStateTpProps, { setMyLoginData: setMyLoginDataThunkCreator })(LoginPage);

export default LoginPageContainer;