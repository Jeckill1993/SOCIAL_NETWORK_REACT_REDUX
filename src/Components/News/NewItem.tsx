import React from 'react';
import '../../global_colors.css';
import styles from './News.module.css';
import {NewType} from "../../redux/news_reducer";

type PropsType = {
    item: NewType
    theme: string
}

const NewItem: React.FC<PropsType> = ({item, theme}) => {
    return (
        <div className={styles.item_container}>
            <h3>{item.title}</h3>
            <div className={styles.info}>
                <p><em>{item.author}</em></p>
                <p><em>{item.publishedAt}</em></p>
            </div>
            <img src={item.urlToImage} alt={'photo'}/>
            <article>
                {item.content}<br/>
                <a className={`${theme}_general`} target={"_blank"} href={item.url}>Source link</a>
            </article>
        </div>
    )
}

export default NewItem;