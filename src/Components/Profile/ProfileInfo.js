import React, {useState} from 'react';
import '../../global_colors.css';
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
    console.log(contacts);
    let contactItem = contacts.map((contact) => {
        return <div><a>{contact}</a></div>
    })
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhotoSuccess(e.target.files[0]);
        }
    }
    return (
        <div className={classes.profileInfo}>
            <h1>{profile.fullName}</h1>
            {
                editMode ?
                    <PersonalInfoSetting setMyPersonalInfo={setMyPersonalInfo} setEditMode={setEditMode}
                                         contacts={profile.contacts}/>
                    :
                    <div className={classes.personalInfo}>
                        <div className={classes.personalPhoto}>
                            <img src={profile.photos.large || userPhoto}
                                 alt={'profile_photo'}/>
                            {isOwner ? <input type={"file"} onChange={onMainPhotoSelected}/> : <span> </span>}
                        </div>
                        <div className={classes.personalContacts}>
                            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                            <div>
                                <div>{profile.aboutMe}</div>
                                <div>{profile.lookingForAJob}</div>
                                <div>{profile.lookingForAJobDescription}</div>
                                <div className={classes.contacts}>
                                    {contactItem}
                                </div>
                            </div>
                            {isOwner ? <button className={`runnyTheme_contentBtn`} onClick={() => {
                                setEditMode(true)
                            }}>Edit</button> : <span> </span>}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfileInfo;