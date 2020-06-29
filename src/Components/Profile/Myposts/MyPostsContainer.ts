import {ActionTypes, PostType, profileActions, ProfileType} from '../../../redux/profile_reducer';
import MyPosts from './MyPosts';
import {connect, ConnectedProps} from 'react-redux';
import {AppStateType} from "../../../redux/redux_store";

type MapStatePropsType = {
    posts: Array<PostType>
    profile: ProfileType | null
    theme: string
}
type DispatchPropsType = {
    addPost: (postText: string) => void
}
let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        theme: state.app.theme,
    }
}


const MyPostsContainer = connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: profileActions.addPostActionCreator})(MyPosts)

export default MyPostsContainer;