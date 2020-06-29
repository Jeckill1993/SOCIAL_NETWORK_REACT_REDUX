import React from 'react';
import '../../global_colors.css';
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../tools/validators/validators";
import styles from './Profile.module.css';
import {ContactsType} from "../../redux/profile_reducer";

let maxLength = maxLengthCreator(30);

type OwnPropsType = {
    theme: string
    contacts: ContactsType
}

const PersonalInfoSettingForm: React.FC<InjectedFormProps<FormDataType, OwnPropsType> & OwnPropsType> = (props) => {
    return (
        <form className={styles.editContactForm} onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'about me'} name={'aboutMe'} component={Input}
                       validate={[required, maxLength]}/>
            </div>
            <div>
                <Field placeholder={'description'} name={'lookingForAJobDescription'} component={Input}/>
            </div>
            <div>
                <Field placeholder={'full name'} name={'fullName'} component={Input}/>
            </div>
            {Object.keys(props.contacts).map(key => {
                return <Field id={key} placeholder={key} name={`contacts.${key}`} component={Input}/>
            })}
                <button className={`${props.theme}_contentBtn`}>Save</button>
        </form>
    )
}

const Form = reduxForm<FormDataType, OwnPropsType>({form: 'personalInfo'})(PersonalInfoSettingForm);

type PropsType = {
    setMyPersonalInfo: (formData: FormDataType) => void
    setEditMode: (value: boolean) => void
    contacts: ContactsType
    theme: string
}
type FormDataType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}

const PersonalInfoSetting: React.FC<PropsType> = ({setMyPersonalInfo, setEditMode, contacts, theme}) => {
    const setInfo = (formData: FormDataType) => {
        setMyPersonalInfo(formData);
        setEditMode(false);
    }
    return (
        <div>
            <Form onSubmit={setInfo} contacts={contacts} theme={theme}/>
        </div>
    )
}

export default PersonalInfoSetting;