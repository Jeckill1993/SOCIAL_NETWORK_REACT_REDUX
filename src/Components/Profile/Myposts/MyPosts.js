import React from 'react';
import classes from './Myposts.module.css'
import Post from './Post/Post.js';



const MyPosts = (props) => {

    let newPostElement = React.createRef();
    let addPost = () => {
        props.addPost();   
    }
    
    let onChangePost = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    let postsElements = props.posts.map((post) => {
        return <Post name={post.name} message={post.message} like={post.likesCount} />
    })

    return (
        <div>
            <div>
                <h2>My posts</h2>
                <textarea ref={newPostElement} onChange={onChangePost} value={props.newPostText} placeholder="your news..."></textarea>
                <br></br>
                <button onClick={addPost}>Send</button>
            </div>
            {postsElements}
        </div>
    )

}


export default MyPosts;