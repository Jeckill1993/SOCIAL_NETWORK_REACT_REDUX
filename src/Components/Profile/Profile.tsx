import React from 'react';
import MyPostsContainer from './Myposts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader';
import ProfileInfo from "./ProfileInfo";
import classes from "./Profile.module.css";
import {FormDataType, ProfileType} from "../../redux/profile_reducer";


type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    theme: string
    updateStatus: (status: string) => void
    savePhotoSuccess: (file: File) => void
    setMyPersonalInfo: (personalInfo: FormDataType) => void
}

const Profile: React.FC<PropsType> = ({isOwner, profile, status, theme, updateStatus, savePhotoSuccess, setMyPersonalInfo}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={classes.profileContainer}>
            <ProfileInfo profile={profile} savePhotoSuccess={savePhotoSuccess} isOwner={isOwner}
                         status={status} updateStatus={updateStatus}
                         setMyPersonalInfo={setMyPersonalInfo} theme={theme}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;