import {profileAPI} from '../API/api.js';

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'social-network/profile/SET-STATUS';
//const DELETE_POST = 'social-network/profile/DELETE-POST';
const SAVE_PHOTO = 'SAVE-PHOTO';


//action creators (return actions)
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
export const savePhoto = (photo) => {
    return {
        type: SAVE_PHOTO,
        photo,
    }
}

//thunk creators (return thunks)
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
export const savePhotoSuccess = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhoto(response.data.data.photos));
        }
    }
}
export const setMyPersonalInfo = (data) => {
    //const userId = getState().auth.userId;
    return async (dispatch) => {
        let response = await profileAPI.setInfo(data);
        if (response.data.resultCode === 0) {
            getProfileThunkCreator(response.data.data.id);
        }
    }
}


let initialState = {
    posts: [
        {
            id: 1,
            name: 'Yevhen Duplenko',
            message: 'TypeScript starts from the same syntax and semantics that millions of JavaScript developers know today. Use existing JavaScript code, incorporate popular JavaScript libraries, and call TypeScript code from JavaScript.',
        },
        {
            id: 2,
            name: 'Yevhen Duplenko',
            message: 'Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.',
        },
        {
            id: 3,
            name: 'Yevhen Duplenko',
            message: 'styled-components is the result of wondering how we could enhance CSS for styling React component systems. By focusing on a single use case we managed to optimize the experience for developers as well as the output for end users.',
        },
        {
            id: 4,
            name: 'Yevhen Duplenko',
            message: 'Gatsby is an open source, modern website framework that builds performance into every site by leveraging the latest web technologies such as React and GraphQL. Create blazing fast apps and websites without needing to become a performance expert.',
        },
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
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo}
            }
        default:
            return state;
    }
}

export default profileReducer;