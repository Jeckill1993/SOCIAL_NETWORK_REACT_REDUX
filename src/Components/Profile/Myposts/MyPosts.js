import React from 'react';
import classes from './Myposts.module.css';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import Post from './Post/Post.js';
import { required } from './../../../tools/validators/validators.js';
import { maxLengthCreator } from './../../../tools/validators/validators.js';
import { Textarea } from './../../common/FormsControls/FormsControls.js'

const maxLength = maxLengthCreator(30);

const MyPosts = React.memo((props) => {

    let addPostText = (value) => {
        props.addPost(value.newPost);
        console.log(value.newPost);
    }

    let postsElements = props.posts.map((post) => {
        return <Post name={post.name} key={post.id} message={post.message} like={post.likesCount} />
    })

    return (
        <div>
            <div>
                <h2>My posts</h2>
                <MyPostsFormRedux onSubmit={addPostText} />
            </div>
            {postsElements}
        </div>
    )
});

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPost" placeholder="Your news..." validate={[required, maxLength]}></Field>
            <br></br>
            <button>Send</button>
        </form>
    )
}

const MyPostsFormRedux = reduxForm({ form: "newPostText" })(MyPostsForm);

export default MyPosts;