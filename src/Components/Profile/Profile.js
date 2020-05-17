import React from 'react';
import MyPostsContainer from './Myposts/MyPostsContainer.js'
import Preloader from '../common/Preloader/Preloader';
import ProfileInfo from "./ProfileInfo";


const Profile = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <ProfileInfo {...props}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;