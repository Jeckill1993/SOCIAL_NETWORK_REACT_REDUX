import React from 'react';
import Profile from './Profile.js';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { getProfileThunkCreator } from './../../redux/profile_reducer.js';
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getProfile(userId);
    }

    render() {

        if (!this.props.isAuth) {
            return <Redirect to={"/login"} />
        }

        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let withURLDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps,
    {
        getProfile: getProfileThunkCreator,
    })
    (withURLDataContainerComponent);