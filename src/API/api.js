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
    getAuthData: () => {
        return instance.get('auth/me').then(response => {
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
    getProfile: (user) => {
        return instance.get(`profile/${user}`).then(response => {
            return response.data;
        }); 
    },
};
