const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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

let initialState = {
    posts: [
        { id: 1, name: 'Dima', message: 'Oh I hate this girls!', likesCount: 12 },
        { id: 2, name: 'Jeka', message: 'I like swimming', likesCount: 12 },
        { id: 3, name: 'Vova', message: 'I need new phone', likesCount: 12 },
        { id: 4, name: 'Oleg', message: 'I am tester', likesCount: 12 },
    ],
    newPostText: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, name: 'Zina', message: state.newPostText, likesCount: 1
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }

}

export default profileReducer;