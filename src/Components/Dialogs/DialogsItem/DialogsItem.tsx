import React from 'react';
import Dialog from './Dialog/Dialog';
import userPhoto from '../../../assets/images/user.jpg';
import {DialogType} from "../../../redux/dialogs_reducer";

type PropsType = {
    dialogs: Array<DialogType>
    getMessages: (id: number) => void
    theme: string
}

const DialogsItem: React.FC<PropsType> = ({dialogs, getMessages, theme}) => {
    let dialogsElements = dialogs.map((person) => {
        return <Dialog userName={person.userName} key={person.id} id={person.id} getMessages={getMessages} theme={theme}
                       photos={person.photos.small ? person.photos.small : userPhoto}/>
    });

    return (
        <div>{dialogsElements}</div>
    )
}

export default DialogsItem;