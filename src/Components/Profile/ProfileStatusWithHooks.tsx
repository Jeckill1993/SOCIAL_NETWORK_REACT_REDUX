import React, {useState, useEffect, ChangeEvent} from 'react';
import classes from './Profile.module.css';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    theme: string
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({status, updateStatus, theme}) => {
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setStatus] = useState(status);

    useEffect(() => {
        setStatus(status);
    }, [status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(localStatus);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={classes.status}>
                {
                    editMode ?
                        <input className={`${theme}_inputs_textarea`} type="text" onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                               value={localStatus}/>
                        :
                        <span onDoubleClick={activateEditMode}>{status || "not status"}</span>
                }
        </div>
    )
}

export default ProfileStatusWithHooks;