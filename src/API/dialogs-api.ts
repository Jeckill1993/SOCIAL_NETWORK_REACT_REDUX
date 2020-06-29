import {instance} from "./api";

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
