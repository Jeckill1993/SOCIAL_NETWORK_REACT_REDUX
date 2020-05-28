import React from 'react';
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../tools/validators/validators";
import styles from './Profile.module.css';

let maxLength = maxLengthCreator(30);


const PersonalInfoSettingForm = (props) => {
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
                <button>Save</button>
        </form>
    )
}

const Form = reduxForm({form: 'personalInfo'})(PersonalInfoSettingForm);

const PersonalInfoSetting = ({setMyPersonalInfo, setEditMode, contacts}) => {
    const setInfo = (formData) => {
        setMyPersonalInfo(formData);
        setEditMode(false);
    }
    return (
        <div>
            <Form onSubmit={setInfo} contacts={contacts}/>
        </div>
    )
}

export default PersonalInfoSetting;