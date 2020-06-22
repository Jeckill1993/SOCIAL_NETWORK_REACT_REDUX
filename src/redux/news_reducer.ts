import {newsAPI} from '../API/api';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux_store";

const GET_NEWS: string = 'social-network/news/GET-NEWS';

export type NewType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: {id: number | null, name: string}
    title: string
    url: string
    urlToImage: string
}
type GetNewsActionType = {
    type: typeof GET_NEWS
    news: Array<NewType>
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, GetNewsActionType>

export const getNewsSuccess = (news: Array<NewType>): GetNewsActionType => {
    return {
        type: GET_NEWS,
        news,
    }
}

export const getNews = (): ThunkType => {
    return async (dispatch) => {
        let response = await newsAPI.getNews();
        if (response.status === 'ok') {
            dispatch(getNewsSuccess(response.articles))
        }
    }
}

type InitialStateType = {
    news: Array<NewType>
}
const initialState = {
    news: [],
}

const newsReducer = (state: InitialStateType = initialState, action: GetNewsActionType): InitialStateType => {
    switch (action.type) {
        case GET_NEWS:
            return {
                ...state,
                news: action.news,
            }
        default :
            return state;
    }
}


export default newsReducer;