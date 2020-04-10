import React from 'react';
import Header from './Header.js';
import { connect } from 'react-redux';
import { getAuthDataThunkCreator } from './../../redux/auth_reducer.js';


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthData();
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthData: getAuthDataThunkCreator })(HeaderContainer);