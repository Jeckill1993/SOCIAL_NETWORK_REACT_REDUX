import React from 'react';
import Profile from './Profile';
import {connect, ConnectedProps} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {getProfileThunkCreator} from '../../redux/profile_reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getStatus} from '../../redux/profile_reducer';
import {updateStatus} from '../../redux/profile_reducer';
import {savePhotoSuccess} from '../../redux/profile_reducer';
import {setMyPersonalInfo} from "../../redux/profile_reducer";
import {AppStateType} from "../../redux/redux_store";

export type PathParamsType = {
    userId: string
}
type PropsType = PropsFromRedux & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
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

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            // @ts-ignore
            <Profile {...this.props} isOwner={!this.props.match.params.userId}  profile={this.props.profile} status={this.props.status} theme={this.props.theme}
                     updateStatus={this.props.updateStatus} savePhotoSuccess={this.props.savePhotoSuccess} setMyPersonalInfo={this.props.setMyPersonalInfo}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    theme: state.app.theme,
})

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapStateToProps, {getProfile: getProfileThunkCreator, getStatus, updateStatus, savePhotoSuccess, setMyPersonalInfo});

export default compose<React.ComponentType>(
    connector,
    withRouter,
    withAuthRedirect
)(ProfileContainer);
