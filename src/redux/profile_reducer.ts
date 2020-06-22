import {profileAPI, ResultCodeEnum} from '../API/api';
import store, {AppStateType} from './redux_store'
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const ADD_POST = 'social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'social-network/profile/SET-USER-PROFILE';
const SET_STATUS = 'social-network/profile/SET-STATUS';
//const DELETE_POST = 'social-network/profile/DELETE-POST';
const SAVE_PHOTO = 'social-network/profile/SAVE-PHOTO';


export type PostType = {
    id: number
    name: string
    message: string
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

type ActionTypes = AddPostActionType | SetUserProfileActionType | SetStatusActionType | SavePhotoActionType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//action creators (return actions)
type AddPostActionType = {
    type: typeof ADD_POST
    postText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string | null
}
export type SavePhotoActionType = {
    type: typeof SAVE_PHOTO
    photo: object
}

export const addPostActionCreator = (postText: string): AddPostActionType => {
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
export const setUserProfile = (profile: ProfileType) : SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile: profile,
})
export const setStatus = (status: string | null): SetStatusActionType => ({
    type: SET_STATUS,
    status: status,
})
export const savePhoto = (photo: object): SavePhotoActionType => {
    return {
        type: SAVE_PHOTO,
        photo,
    }
}

//thunk creators (return thunks)
export const getProfileThunkCreator = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let profileData = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(profileData));
    }
}
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(setStatus(status));
        }
    }
}
export const savePhotoSuccess = (file: string | Blob): ThunkType => {
    return async (dispatch) => {
        let savePhotoData = await profileAPI.savePhoto(file);
        if (savePhotoData.resultCode === ResultCodeEnum.Success) {
            dispatch(savePhoto(savePhotoData.data.photos));
        }
    }
}
export const setMyPersonalInfo = (data: any): ThunkType => {
    const userId = store.getState().auth.userId;
    return async (dispatch) => {
        let response = await profileAPI.setInfo(data);
        if (response.resultCode === 0) {
            dispatch(getProfileThunkCreator(userId));
        }
    }
}

type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string | null
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

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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
                profile: {...state.profile, photos: action.photo} as ProfileType
            }
        default:
            return state;
    }
}

export default profileReducer;