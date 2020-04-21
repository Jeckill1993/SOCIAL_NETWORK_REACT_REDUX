const ADD_MESSAGE = 'ADD-MESSAGE';

export const createNewMessageActionCreator = (message) => {
    return {
        type: ADD_MESSAGE,
        message,
    }
}


let initialState = {
    dialogs: [
        { id: 6, name: 'Jeka', avatar: "https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png" },
        { id: 7, name: 'Dima', avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSje9XgleNWVOQiO4fHP5FQ9yHorwOIS29_24ex2zzjki0M7h88" },
        { id: 8, name: 'Dimoon', avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9cooUwgzClXEkKQxifvH7hJZLr_pTf8Ha7vtsvsY9yH_NOzwh" },
    ],
    messages: [
        { id: 9, message: "Hey!" },
        { id: 10, message: "How are you?" },
        { id: 11, message: "Where are you now?" },
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4, message: action.message,
            }
            return {
                ...state,
                messages: [...state.messages, (newMessage)]
            }
        default:
            return state;
    }
}

export default dialogsReducer;