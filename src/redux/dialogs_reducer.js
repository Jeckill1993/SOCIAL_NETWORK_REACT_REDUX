const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

export const createNewMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE,
    }
}
export const updateTextMessageActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessage: text,
    }
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Jeka', avatar: "https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png" },
        { id: 2, name: 'Dima', avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSje9XgleNWVOQiO4fHP5FQ9yHorwOIS29_24ex2zzjki0M7h88" },
        { id: 3, name: 'Dimoon', avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9cooUwgzClXEkKQxifvH7hJZLr_pTf8Ha7vtsvsY9yH_NOzwh" },
    ],
    messages: [
        { id: 1, message: "Hey!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Where are you now?" },
    ],
    newMessageText: '',
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4, message: state.newMessageText,
            }
            state.messages.push(newMessage);
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage;
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;