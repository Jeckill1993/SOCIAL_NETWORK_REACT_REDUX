import {newsAPI} from '../API/api';

const GET_NEWS: string = 'social-network/news/GET-NEWS';

export type NewType = {
    title: string
    author: string
    publishedAt: string
    urlToImage: string
    content: string
    url: string
}

type GetNewsActionType = {
    type: typeof GET_NEWS
    news: Array<object>
}
export const getNewsSuccess = (news: Array<object>): GetNewsActionType => {
    return {
        type: GET_NEWS,
        news,
    }
}

export const getNews = () => {
    return async (dispatch: any) => {
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

const newsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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