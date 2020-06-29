import React, {ChangeEvent, useState} from 'react';
import '../../global_colors.css';
import classes from "./Profile.module.css";
import userPhoto from "../../assets/images/user.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import PersonalInfoSetting from "./PersonalnfoSetting";
import {ContactsType, FormDataType, ProfileType} from "../../redux/profile_reducer";

type PropsType = {
    profile: ProfileType | null
    savePhotoSuccess: (photo: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    setMyPersonalInfo: (personalInfo: FormDataType) => void
    theme: string
}

const ProfileInfo: React.FC<PropsType> = ({profile, savePhotoSuccess, isOwner, status, updateStatus, setMyPersonalInfo, theme}) => {
    let [editMode, setEditMode] = useState(false);
    let contacts = [];
    for (let contact in profile?.contacts) {
        contacts.push(profile?.contacts[contact as keyof ContactsType]);
    }
    let contactItem = contacts.map((contact) => {
        return <div><a>{contact}</a></div>
    })
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhotoSuccess(e.target.files[0]);
        }
    }
    return (
        <div className={classes.profileInfo}>
            <h1>{profile?.fullName}</h1>
            {
                editMode ?
                    <PersonalInfoSetting setMyPersonalInfo={setMyPersonalInfo} setEditMode={setEditMode}
                        // @ts-ignore
                                         contacts={profile?.contacts} theme={theme}/>
                    :
                    <div className={classes.personalInfo}>
                        <div className={classes.personalPhoto}>
                            <img src={profile?.photos.large || userPhoto}
                                 alt={'profile_photo'}/>
                            {isOwner ? <input type={"file"} onChange={onMainPhotoSelected}/> : <span> </span>}
                        </div>
                        <div className={classes.personalContacts}>
                            <ProfileStatusWithHooks theme={theme} status={status} updateStatus={updateStatus}/>
                            <div>
                                <div>{profile?.aboutMe}</div>
                                <div>{profile?.lookingForAJob}</div>
                                <div>{profile?.lookingForAJobDescription}</div>
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