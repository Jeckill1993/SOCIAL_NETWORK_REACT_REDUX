import {newsAPI} from '../API/api';

const GET_NEWS = 'social-network/news/GET-NEWS';

export const getNewsSuccess = (news) => {
    return {
        type: GET_NEWS,
        news,
    }
}

export const getNews = () => {
    return async (dispatch) => {
        let response = await newsAPI.getNews();
        if (response.status === 'ok') {
            dispatch(getNewsSuccess(response.articles))
        }
    }
}

const initialState = {
    news: [],
}
const newsReducer = (state = initialState, action) => {
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