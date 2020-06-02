import React from 'react';
//import classes from './News.module.css';

const News = ({news}) => {
    debugger;
    let newsItems = news.map(item => {
        return <div>{item.author}</div>
    })
    return (
        <div>
            {newsItems}
        </div>
    )
}

export default News;