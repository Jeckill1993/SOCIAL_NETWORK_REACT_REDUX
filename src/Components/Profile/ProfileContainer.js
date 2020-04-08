import React from 'react';
import classes from './Profile.module.css';
import * as Axios from 'axios';
import Profile from './Profile.js';
import { connect } from 'react-redux';
import { setUserProfile } from './../../redux/profile_reducer.js';
import { withRouter } from 'react-router-dom';
import { usersAPI } from './../../API/api.js';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        usersAPI.getProfile(userId).then(data => {
            this.props.setUserProfile(data);
        });
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let withURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(withURLDataContainerComponent);