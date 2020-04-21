import { profileAPI } from '../API/api.js';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';


export const addPostActionCreator = (postText) => {
    return {
        type: ADD_POST,
        postText,
    }
}
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile,
})
export const setStatus = (status) => ({
    type: SET_STATUS,
    status: status,
})

export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(response.data));
            }
        })
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
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        default:
            return state;
    }

}

export default profileReducer;