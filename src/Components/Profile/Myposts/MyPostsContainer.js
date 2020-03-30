import React from 'react';
import { addPostActionCreator } from '../../../redux/profile_reducer.js';
import { updateNewPostTextActionCreator } from '../../../redux/profile_reducer.js';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext.js';


const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();
                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    }
                    let onChangePost = (e) => {
                        store.dispatch(updateNewPostTextActionCreator(e));
                    }
                    return <MyPosts updateNewPostText={onChangePost}
                        addPost={addPost} posts={state.profile.posts} newPostText={state.profile.newPostText} />
                }}
        </StoreContext.Consumer>

    )

}


export default MyPostsContainer;