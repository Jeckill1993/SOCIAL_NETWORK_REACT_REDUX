import {FormDataType, ProfileType} from "../redux/profile_reducer";
import {instance} from "./api";

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
    getStatus: (userId: number | null) => {
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
    setInfo: (data: FormDataType) => {
        return instance.put<SetInfoType>(`/profile`, data).then(response => {
            return response.data;
        })
    }
}