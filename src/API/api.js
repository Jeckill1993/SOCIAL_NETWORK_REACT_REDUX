import * as Axios from 'axios';


const instance = Axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "7295d82b-557f-41da-939b-739c59f25411"
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
        return instance.put(`/profile/status`, {status: status});
    },
    savePhoto: (photoFile) => {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
    },
    setInfo: (data) => {
        return instance.put(`/profile`, data).then(response => {
                return response;
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
        return instance.post('/auth/login', {email: data.email, password: data.password, rememberMe: data.rememberMe, captcha: data.captcha}).then(response => {
            return response;
        })
    },
    logOut: () => {
        return instance.delete('/auth/login').then(response => {
            return response;
        })
    }
}


