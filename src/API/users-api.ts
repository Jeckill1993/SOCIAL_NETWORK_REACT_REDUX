import {UserType} from "../redux/users_reducer";
import {instance} from "./api";

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type MakeFollowDeleteFollowType = {
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