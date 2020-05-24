import React from 'react';
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../tools/validators/validators";

let maxLength = maxLengthCreator(30);


const PersonalInfoSettingForm = (props) => {
    let contacts = [];
    for (let contact in props.contacts) {
        contacts.push(props.contacts[contact]);
    }
    let contactItem = contacts.map((contact) => {
        return <Field placeholder={contact} name={contact} component={Input}/>
    })
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'about me'} name={'aboutMe'} component={Input}
                       validate={[required, maxLength]}/>
            </div>
            <div>
                <Field placeholder={'looking for a job'} name={'lookingForAJob'} component={Input}/>
            </div>
            <div>
                <Field placeholder={'description'} name={'lookingForAJobDescription'} component={Input}/>
            </div>
            <div>
                <Field placeholder={'full name'} name={'fullName'} component={Input}/>
            </div>
            {contactItem}
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