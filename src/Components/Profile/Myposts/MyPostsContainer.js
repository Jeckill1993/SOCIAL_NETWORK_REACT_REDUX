import { profileActions } from '../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        theme: state.app.theme,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postText) => {dispatch(profileActions.addPostActionCreator(postText))},
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;