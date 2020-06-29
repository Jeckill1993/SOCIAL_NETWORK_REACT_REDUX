import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "ad631ad0-d20d-452d-9853-a4c3da20d413",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

