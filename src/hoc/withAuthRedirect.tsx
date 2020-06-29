import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {AppStateType} from "../redux/redux_store";


let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<PropsFromRedux> {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to={"/login"} />
            }
            return <Component {...this.props} />
        }
    }

    type PropsFromRedux = ConnectedProps<typeof connector>
    let connector = connect(mapStateToProps);
    let ConnectedAuthRedirectComponent = connector(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}

