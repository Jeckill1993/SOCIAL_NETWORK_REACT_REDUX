import { profileAPI } from '../API/api.js';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'social-network/profile/SET-STATUS';
//const DELETE_POST = 'social-network/profile/DELETE-POST';


export const addPostActionCreator = (postText) => {
    return {
        type: ADD_POST,
        postText,
    }
}
/*export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId,
    }
}*/
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile,
})
export const setStatus = (status) => ({
    type: SET_STATUS,
    status: status,
})

export const getProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
    }
}
export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}
export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(getStatus(response.data));
        }
    }
}

let initialState = {
    posts: [
        { id: 1, name: 'Dima', message: 'Oh I hate this girls!', likesCount: 12 },
        { id: 2, name: 'Jeka', message: 'I like swimming', likesCount: 12 },
        { id: 3, name: 'Vova', message: 'I need new phone', likesCount: 12 },
        { id: 4, name: 'Oleg', message: 'I am tester', likesCount: 12 },
    ],
    profile: null,
    status: null,
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, name: 'Zina', message: action.postText, likesCount: 1
            };
            return {
                ...state,
                posts: [...state.posts, (newPost)],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        /*case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((post) => { post.id != action.postId }),
            };
        }*/
        default:
            return state;
    }

}

export default profileReducer;