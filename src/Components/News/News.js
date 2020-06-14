import React from 'react';
import NewItem from "./NewItem";
//import classes from './News.module.css';

const News = ({news, theme}) => {
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