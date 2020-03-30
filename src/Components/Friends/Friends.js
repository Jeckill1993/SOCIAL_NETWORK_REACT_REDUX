import React from 'react';
import classes from './Friends.module.css';
import Friend from './Friend/Friend.js';
import StoreContext from '../../StoreContext';


let Friends = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let friendsData = store.getState().friends_information.friends.map((friend) => {
                        return <Friend id={friend.id} avatar={friend.avatar} fullname={friend.fullname} />
                    })

                    return <div className={classes.container}>
                        {friendsData}
                    </div>
                }
            }
        </StoreContext.Consumer>
    )
}

export default Friends;