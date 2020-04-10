import React from 'react';
import classes from './Music.module.css';

const Music = () =>{
    return (
        <div>
            <h3>Your playlist</h3>
            <ul className={classes.music_List}>
                <li><audio src="https://mp3online.mobi/data/s/sabaton/sabaton-primo-victoria.mp3" controls>Sabaton</audio></li>
            </ul>
        </div>
    )
}

export default Music;