import React from 'react';
import '../../../global_colors.css';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import Post from './Post/Post.js';
import {required} from '../../../tools/validators/validators.js';
import {maxLengthCreator} from '../../../tools/validators/validators.js';
import {Textarea} from '../../common/FormsControls/FormsControls.js';
import classes from './Myposts.module.css';

const maxLength = maxLengthCreator(30);

const MyPostsForm = (props) => {
    return (
        <form className={classes.formAddPost} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPost" placeholder="Your news..." validate={[required, maxLength]}/>
            <button className={`runnyTheme_contentBtn`}>Send</button>
        </form>
    )
}

const MyPostsFormRedux = reduxForm({form: "newPostText"})(MyPostsForm);

const MyPosts = React.memo(({posts, addPost, profile}) => {

    let addPostText = (value) => {
        addPost(value.newPost);
    }
    let postsElements = posts.map((post) => {
        return <Post name={post.name} key={post.id} message={post.message} photo={profile.photos.large}/>
    })

    return (
        <div>
            <h2>My posts</h2>
            <MyPostsFormRedux onSubmit={addPostText}/>
            {postsElements}
        </div>
    )
});

export default MyPosts;