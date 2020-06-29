import axios from "axios";

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
