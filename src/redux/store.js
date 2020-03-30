/*import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import friendInformationReducer from "./friends_information_reducer";


let store = {
    _state: {
        profile: {
            posts: [
                { id: 1, name: 'Dima', message: 'Oh I hate this girls!', likesCount: 12 },
                { id: 2, name: 'Jeka', message: 'I like swimming', likesCount: 12 },
                { id: 3, name: 'Vova', message: 'I need new phone', likesCount: 12 },
                { id: 4, name: 'Oleg', message: 'I am tester', likesCount: 12 },
            ],
            newPostText: '',
        },
        dialogs: {
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
        },
        friends_information: {
            friends: [
                { id: 1, fullname: "Kristi Golden", avatar: "https://i.ytimg.com/vi/LNfADMqDbbs/maxresdefault.jpg" },
                { id: 2, fullname: "Glen Kuck", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSje9XgleNWVOQiO4fHP5FQ9yHorwOIS29_24ex2zzjki0M7h88" },
                { id: 3, fullname: "Agata Kristi", avatar: "https://aquariumax.ru/wp-content/uploads/2016/12/%D0%B4%D0%BE%D0%BC%D0%B0%D1%88-800x400.jpg" },
                { id: 4, fullname: "John Travolta", avatar: "https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png" },
                { id: 5, fullname: "Yevhen Petrosian", avatar: "https://pets2.me/media/res/2/4/8/5/9/24859.pbdvz0.300.jpg" },
                { id: 6, fullname: "Bob Marley", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9cooUwgzClXEkKQxifvH7hJZLr_pTf8Ha7vtsvsY9yH_NOzwh" },
                { id: 1, fullname: "Kristi Golden", avatar: "https://i.ytimg.com/vi/LNfADMqDbbs/maxresdefault.jpg" },
                { id: 2, fullname: "Glen Kuck", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSje9XgleNWVOQiO4fHP5FQ9yHorwOIS29_24ex2zzjki0M7h88" },
                { id: 3, fullname: "Agata Kristi", avatar: "https://aquariumax.ru/wp-content/uploads/2016/12/%D0%B4%D0%BE%D0%BC%D0%B0%D1%88-800x400.jpg" },
                { id: 4, fullname: "John Travolta", avatar: "https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png" },
                { id: 5, fullname: "Yevhen Petrosian", avatar: "https://pets2.me/media/res/2/4/8/5/9/24859.pbdvz0.300.jpg" },
                { id: 6, fullname: "Bob Marley", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9cooUwgzClXEkKQxifvH7hJZLr_pTf8Ha7vtsvsY9yH_NOzwh" },
            ],
            newFriend: {}
        }
    },
    _rerenderEntireTree() {

    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },
    dispatch(action) {
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);
        this._state.friends_information = friendInformationReducer(this._state.friends_information, action);

        this._rerenderEntireTree(this._state);
    }
}

export default store;*/