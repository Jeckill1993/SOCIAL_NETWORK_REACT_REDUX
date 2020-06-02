import * as Axios from 'axios';


const instance = Axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "ad631ad0-d20d-452d-9853-a4c3da20d413",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});


export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
        }).then(response => {
            return response.data;
        });
    },
    deleteFollow: (user) => {
        return instance.delete(`follow/${user}`).then(response => {
            return response.data;
        });
    },
    makeFollow: (user) => {
        return instance.post(`follow/${user}`).then(response => {
            return response.data;
        });
    },

};
export const profileAPI = {
    getProfile: (user) => {
        return instance.get(`profile/${user}`).then(response => {
            return response.data;
        });
    },
    getStatus: (userId) => {
        return instance.get(`/profile/status/${userId}`).then(response => {
            return response;
        })
    },
    updateStatus: (status) => {
        return instance.put(`/profile/status`, {status: status}).then(response => {
            return response.data;
        });
    },
    savePhoto: (photoFile) => {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
    },
    setInfo: (data) => {
        return instance.put(`/profile`, data).then(response => {
                return response.data;
            })
    }
}
export const authAPI = {
    me: () => {
        return instance.get('auth/me').then(response => {
            return response.data;
        });
    },
    login: (data) => {
        return instance.post('auth/login', {email: data.email, password: data.password, rememberMe: data.rememberMe, captcha: data.captcha}).then(response => {
            return response;
        })
    },
    logOut: () => {
        return instance.delete('auth/login').then(response => {
            return response;
        })
    }
}
export const dialogsAPI = {
    startDialog: (friendId) => {
        return instance.put(`dialogs/${friendId}`).then(response => {
            return response.data;
        })
    },
    getDialogs: () => {
        return instance.get('dialogs').then(response => {
            return response.data;
        })
    },
    getFriendMessages: (userId) => {
        return instance.get(`dialogs/${userId}/messages`).then(response => {
            return response.data;
        })
    },
    sendMessage: ({userId, body}) => {
        return instance.post(`dialogs/${userId}/messages`, {body: body}).then(response => {
            return response.data;
        })
    },
    getMessageView: (messageId) => {
        return instance.get(`dialogs/messages/${messageId}/viewed`).then(response => {
            return response.data;
        })
    },
    deleteMessageForOwn: (messageId) => {
        return instance.get(`dialogs/messages/${messageId}`).then(response => {
            return response.data;
        })
    },
    restoreMessageFromDelete: (messageId) => {
        return instance.get(`dialogs/messages/${messageId}/restore`).then(response => {
            return response.data;
        })
    },
    getMessagesWithDate: (userId, date) => {
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then(response => {
            return response.data;
        })
    },
    getNewMessages: () => {
        return instance.get(`dialogs/messages/new/count`).then(response => {
            return response.data;
        })
    }
}
let data = new Date();
export const newsAPI = {
    getNews: () => {
        return Axios.get(`http://newsapi.org/v2/everything?q=bitcoin&from=${data}&sortBy=publishedAt&apiKey=9f78a09b840c48259f1d69604ecf42f1`).then(response => {
            return response.data;
        })
    }
}


