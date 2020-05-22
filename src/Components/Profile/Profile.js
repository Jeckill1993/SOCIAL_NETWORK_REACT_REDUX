import React from 'react';
import MyPostsContainer from './Myposts/MyPostsContainer.js'
import Preloader from '../common/Preloader/Preloader';
import ProfileInfo from "./ProfileInfo";
import classes from "./Profile.module.css";


const Profile = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={classes.profileContainer}>
            <ProfileInfo {...props}/>
            <MyPostsContainer {...props}/>
        </div>
    )
}

export default Profile;