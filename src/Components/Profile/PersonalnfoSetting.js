import React from 'react';
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../tools/validators/validators";

let maxLength = maxLengthCreator(30);


const PersonalInfoSettingForm = (props) => {
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
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

const Form = reduxForm({form: 'personalInfo'})(PersonalInfoSettingForm);

const PersonalInfoSetting = ({setMyPersonalInfo, setEditMode}) => {
    const setInfo = (formData) => {
        setMyPersonalInfo(formData);
        setEditMode(false);
    }
    return (
        <div>
            <Form onSubmit={setInfo}/>
        </div>
    )
}

export default PersonalInfoSetting;