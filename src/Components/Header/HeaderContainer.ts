import Header from './Header';
import { connect } from 'react-redux';
import { logOutThunkCreator } from '../../redux/auth_reducer';
import {AppStateType} from "../../redux/redux_store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    theme: string
}
type MapDispatchPropsType = {
    logOut: () => void
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    theme: state.app.theme,
});
const HeaderContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { logOut: logOutThunkCreator })(Header);

export default HeaderContainer;