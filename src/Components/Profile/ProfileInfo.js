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
        <div className={classes.profileInfo}>
            <h1>{profile.fullName}</h1>
            {
                editMode ?
                    <PersonalInfoSetting setMyPersonalInfo={setMyPersonalInfo} setEditMode={setEditMode} contacts={profile.contacts}/>
                    :
                    <div className={classes.personalInfo}>
                        <img className={classes.personalPhoto} src={profile.photos.large || userPhoto}
                             alt={'profile_photo'}/>
                            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                        <div className={classes.personalEdit}>
                            {isOwner ? <input type={"file"} onChange={onMainPhotoSelected}/> : <span> </span>}
                            <div>Open gallery</div>
                        </div>
                        <div className={classes.personalContacts}>
                            <div>
                                <div>{profile.aboutMe}</div>
                                <div>{profile.lookingForAJob}</div>
                                <div>{profile.lookingForAJobDescription}</div>
                                <div className={classes.contacts}>
                                    {contactItem}
                                </div>
                            </div>
                            {isOwner ? <button onClick={() => {
                                setEditMode(true)
                            }}>Edit</button> : <span> </span>}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfileInfo;