import React from 'react';
import Profile from './Profile.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getProfileThunkCreator} from '../../redux/profile_reducer.js';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';
import {compose} from 'redux';
import {getStatus} from '../../redux/profile_reducer.js';
import {updateStatus} from '../../redux/profile_reducer.js';
import {savePhotoSuccess} from '../../redux/profile_reducer.js';
import {setMyPersonalInfo} from "../../redux/profile_reducer";


class ProfileContainer extends React.Component {

    refreshProfile = () => {
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

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId}  profile={this.props.profile} status={this.props.status} theme={this.props.theme}
                     updateStatus={this.props.updateStatus} savePhotoSuccess={this.props.savePhotoSuccess} setMyPersonalInfo={this.props.setMyPersonalInfo}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    theme: state.app.theme,
})

export default compose(
    connect(mapStateToProps, {getProfile: getProfileThunkCreator, getStatus, updateStatus, savePhotoSuccess, setMyPersonalInfo}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);