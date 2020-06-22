import React from 'react';
import '../../../global_colors.css';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import Post from './Post/Post';
import {required} from '../../../tools/validators/validators';
import {maxLengthCreator} from '../../../tools/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';
import classes from './Myposts.module.css';
import {PostType, ProfileType} from "../../../redux/profile_reducer";

const maxLength = maxLengthCreator(30);

// @ts-ignore
const MyPostsForm = (props) => {
    return (
        <form className={classes.formAddPost} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPost" placeholder="Your news..." validate={[required, maxLength]}/>
            <button className={`${props.theme}_contentBtn`}>Send</button>
        </form>
    )
}

const MyPostsFormRedux = reduxForm({form: "newPostText"})(MyPostsForm);

type PropsType = {
    posts: Array<PostType>
    addPost: (newPost: string) => void
    profile: ProfileType
    theme: string
}
type ValueType = {
    newPost: string
}

const MyPosts: React.FC<PropsType> = React.memo(({posts, addPost, profile, theme}) => {
    let addPostText = (value: ValueType) => {
        addPost(value.newPost);
    }
    let postsElements = posts.map((post) => {
        return <Post name={post.name} key={post.id} id={post.id} message={post.message} photo={profile.photos.large} theme={theme}/>
    })

    return (
        <div>
            <h2>My posts</h2>

            <MyPostsFormRedux
                // @ts-ignore
                onSubmit={addPostText} theme={theme}/>
            {postsElements}
        </div>
    )
});

export default MyPosts;