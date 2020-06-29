import {instance, ResultCodeEnum} from "./api";

type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type AuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LogOutResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    data: {}
}

export const authAPI = {
    me: () => {
        return instance.get<AuthResponseType>('auth/me').then(response => {
            return response.data;
        });
    },
    login: (data: LoginType) => {
        return instance.post<LoginResponseType>('auth/login', {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        }).then(response => {
            return response.data;
        })
    },
    logOut: () => {
        return instance.delete<LogOutResponseType>('auth/login').then(response => {
            return response.data;
        })
    }
}