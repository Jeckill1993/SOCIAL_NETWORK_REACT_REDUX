import React, {useState} from 'react';
import classes from "./Profile.module.css";
import userPhoto from "../../assets/images/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import PersonalInfoSetting from "./PersonalnfoSetting";

const ProfileInfo = ({profile, savePhotoSuccess, isOwner, status, updateStatus, setMyPersonalInfo}) => {
    let [editMode, setEditMode] = useState(false);
    let contacts = [];
    for (let contact in profile.contacts) {
        contacts.push(profile.contacts[contact]);
    }
    let contactItem = contacts.map((contact) => {
        return <div>{contact}</div>
    })
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoSuccess(e.target.files[0]);
        }
    }
    return (
        <div>
            {
                editMode ?
                    <PersonalInfoSetting setMyPersonalInfo={setMyPersonalInfo} setEditMode={setEditMode}/>
                    :
                    <div className={classes.profileItem}>
                        <div className={classes.mainInfo}>
                            <img src={profile.photos.large || userPhoto} alt={'profile_photo'}/>
                            {isOwner ? <input type={"file"} onChange={onMainPhotoSelected}/> : <span> </span>}
                            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                            <div>{profile.aboutMe}</div>
                            <div>{profile.lookingForAJob}</div>
                            <div>{profile.lookingForAJobDescription}</div>
                            <div>{profile.fullName}</div>
                        </div>
                        <div className={classes.contacts}>
                            {contactItem}
                        </div>
                        {isOwner ? <button onClick={() => {setEditMode(true)}}>Edit</button> : <span> </span>}
                    </div>
            }
        </div>
    )
}

export default ProfileInfo;