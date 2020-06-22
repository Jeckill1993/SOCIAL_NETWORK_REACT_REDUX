import axios from 'axios';
import {ProfileType} from "../redux/profile_reducer";
import {UserType} from "../redux/users_reducer";


const instance = axios.create({
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

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type MakeFollowDeleteFollowType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    getUsers: (currentPage: number | undefined, pageSize: number) => {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`, {}).then(response => {
            return response.data;
        });
    },
    makeFollow: (user: number) => {
        return instance.post<MakeFollowDeleteFollowType>(`follow/${user}`).then(response => {
            return response.data;
        });
    },
    deleteFollow: (user: number) => {
        return instance.delete<MakeFollowDeleteFollowType>(`follow/${user}`).then(response => {
            return response.data;
        });
    }
};

type UpdateStatusType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type SavePhotoType = {
    resultCode: 1
    messages: ['Something wrong'],
    data: {
        photos: {
            small: string | null
            large: string | null
        }
    }
}
type SetInfoType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export const profileAPI = {
    getProfile: (user: number | null) => {
        return instance.get<ProfileType>(`profile/${user}`).then(response => {
            return response.data;
        });
    },
    getStatus: (userId: number) => {
        return instance.get(`/profile/status/${userId}`).then(response => {
            return response;
        })
    },
    updateStatus: (status: string) => {
        return instance.put<UpdateStatusType>(`/profile/status`, {status: status}).then(response => {
            return response.data;
        });
    },
    savePhoto: (photoFile: string | Blob) => {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        })
    },
    setInfo: (data: ProfileType) => {
        return instance.put<SetInfoType>(`/profile`, data).then(response => {
            return response.data;
        })
    }
}

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

type SendMessageObjectType = {
    userId: number
    body: string
}
type FriendMessageType = {
    addedAt: string
    body: string
    id: number
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: string | null
    viewed: boolean
}
type StartDialogType = {
    data: {}
    messages: Array<string>
    resultCode: number
}
type GetDialogsType = {
    id: number
    userName: string
    hasNewMessages: false
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string,
        large: string
    }
}
type GetFriendMessagesType = {
    error: string | null
    items: Array<FriendMessageType>
    totalCount: number
}
type SendMessageType = {
    message: FriendMessageType
    messages: Array<string>
    resultCode: number
}
export const dialogsAPI = {
    startDialog: (friendId: number) => {
        return instance.put<StartDialogType>(`dialogs/${friendId}`).then(response => {
            return response.data;
        })
    },
    getDialogs: () => {
        return instance.get<Array<GetDialogsType>>('dialogs').then(response => {
            return response.data;
        })
    },
    getFriendMessages: (userId: number) => {
        return instance.get<GetFriendMessagesType>(`dialogs/${userId}/messages`).then(response => {
            return response.data;
        })
    },
    sendMessage: ({userId, body}: SendMessageObjectType) => {
        return instance.post<SendMessageType>(`dialogs/${userId}/messages`, {body: body}).then(response => {
            return response.data;
        })
    },
    getMessageView: (messageId: number) => {
        return instance.get(`dialogs/messages/${messageId}/viewed`).then(response => {
            return response.data;
        })
    },
    deleteMessageForOwn: (messageId: number) => {
        return instance.get(`dialogs/messages/${messageId}`).then(response => {
            return response.data;
        })
    },
    restoreMessageFromDelete: (messageId: number) => {
        return instance.get(`dialogs/messages/${messageId}/restore`).then(response => {
            return response.data;
        })
    },
    getMessagesWithDate: (userId: number, date: string) => {
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then(response => {
            return response.data;
        })
    },
    getNewMessages: () => {
        return instance.get<number>(`dialogs/messages/new/count`).then(response => {
            return response.data;
        })
    }
}

type ArticleType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: {id: number | null, name: string}
    title: string
    url: string
    urlToImage: string
}
type GetNewsType = {
    articles: Array<ArticleType>
    status: string
    totalResults: number
}
let data = new Date();
export const newsAPI = {
    getNews: () => {
        return axios.get<GetNewsType>(`http://newsapi.org/v2/everything?q=bitcoin&from=${data}&sortBy=publishedAt&apiKey=9f78a09b840c48259f1d69604ecf42f1`).then(response => {
            return response.data;
        })
    }
}


