import React from 'react';
import { addPostActionCreator } from '../../../redux/profile_reducer.js';
import { updateNewPostTextActionCreator } from '../../../redux/profile_reducer.js';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {dispatch(addPostActionCreator())},
        onChangePost: (e) => {dispatch(updateNewPostTextActionCreator(e))}
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;