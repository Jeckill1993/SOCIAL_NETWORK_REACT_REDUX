import React, {useState, useEffect} from 'react';
import classes from './Profile.module.css';

const ProfileStatusWithHooks = ({status, updateStatus}) => {
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
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={classes.status}>
                {
                    editMode ?
                        <input type="text" onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}
                               value={localStatus}/>
                        :
                        <span onDoubleClick={activateEditMode}>{status || "not status"}</span>
                }
        </div>
    )
}

export default ProfileStatusWithHooks;