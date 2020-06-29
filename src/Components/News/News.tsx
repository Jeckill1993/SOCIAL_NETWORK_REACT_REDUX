import React from 'react';
import NewItem from "./NewItem";
import {NewType} from "../../redux/news_reducer";

type PropsType = {
    news: Array<NewType>
    theme: string
}

const News: React.FC<PropsType> = ({news, theme}) => {
    let newsItems = news.map(item => {
        return <NewItem item={item} theme={theme}/>
    })
    return (
        <div>
            {newsItems}
        </div>
    )
}

export default News;