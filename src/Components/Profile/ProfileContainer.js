import React from 'react';
import Profile from './Profile.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfileThunkCreator } from './../../redux/profile_reducer.js';
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import { getStatus } from './../../redux/profile_reducer.js';
import { updateStatus } from './../../redux/profile_reducer.js';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {
                this.props.history.push('/login'); //redirect without JSX
            }
        } 
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
})

export default compose(
    connect(mapStateToProps, { getProfile: getProfileThunkCreator, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);