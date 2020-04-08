import React from 'react';
import Header from './Header.js';
import * as Axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserData } from './../../redux/auth_reducer.js';
import { usersAPI } from './../../API/api.js';


class HeaderContainer extends React.Component {
    componentDidMount() {
        usersAPI.getAuthData().then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                this.props.setAuthUserData(id, login, email);
            }
        });
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);