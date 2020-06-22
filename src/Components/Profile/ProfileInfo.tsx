import React, {useState} from 'react';
import '../../global_colors.css';
import classes from "./Profile.module.css";
import userPhoto from "../../assets/images/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import PersonalInfoSetting from "./PersonalnfoSetting";
import {ProfileType} from "../../redux/profile_reducer";

type PropsType = {
    profile: ProfileType
    savePhotoSuccess: (photo: string) => void
    isOwner: boolean
    status: string | null
    updateStatus: (status: string | null) => void
    setMyPersonalInfo: () => void
    theme: string
}

const ProfileInfo: React.FC<PropsType> = ({profile, savePhotoSuccess, isOwner, status, updateStatus, setMyPersonalInfo, theme}) => {
    let [editMode, setEditMode] = useState(false);
    let contacts = [];
    for (let contact in profile.contacts) {
        // @ts-ignore
        contacts.push(profile.contacts[contact]);
    }
    let contactItem = contacts.map((contact) => {
        return <div><a>{contact}</a></div>
    })
    const onMainPhotoSelected = (e: any) => {
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
                                         contacts={profile.contacts} theme={theme}/>
                    :
                    <div className={classes.personalInfo}>
                        <div className={classes.personalPhoto}>
                            <img src={profile.photos.large || userPhoto}
                                 alt={'profile_photo'}/>
                            {isOwner ? <input type={"file"} onChange={onMainPhotoSelected}/> : <span> </span>}
                        </div>
                        <div className={classes.personalContacts}>
                            <ProfileStatusWithHooks theme={theme} status={status} updateStatus={updateStatus}/>
                            <div>
                                <div>{profile.aboutMe}</div>
                                <div>{profile.lookingForAJob}</div>
                                <div>{profile.lookingForAJobDescription}</div>
                                <div className={classes.contacts}>
                                    {contactItem}
                                </div>
                            </div>
                            {isOwner ? <button className={`${theme}_contentBtn`} onClick={() => {
                                setEditMode(true)
                            }}>Edit</button> : <span> </span>}
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProfileInfo;