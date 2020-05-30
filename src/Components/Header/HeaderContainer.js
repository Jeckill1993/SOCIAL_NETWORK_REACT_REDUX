import Header from './Header.js';
import { connect } from 'react-redux';
import { logOutThunkCreator } from '../../redux/auth_reducer.js';


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});
const HeaderContainer = connect(mapStateToProps, { logOut: logOutThunkCreator })(Header);

export default HeaderContainer;