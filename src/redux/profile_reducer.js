const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
    }
}
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile,
})

let initialState = {
    posts: [
        { id: 1, name: 'Dima', message: 'Oh I hate this girls!', likesCount: 12 },
        { id: 2, name: 'Jeka', message: 'I like swimming', likesCount: 12 },
        { id: 3, name: 'Vova', message: 'I need new phone', likesCount: 12 },
        { id: 4, name: 'Oleg', message: 'I am tester', likesCount: 12 },
    ],
    newPostText: '',
    profile: null,
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, name: 'Zina', message: state.newPostText, likesCount: 1
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, (newPost)],
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        default:
            return state;
    }

}

export default profileReducer;