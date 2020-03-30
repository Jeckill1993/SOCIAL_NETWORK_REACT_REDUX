import React from 'react';
import classes from './AvatarNav.module.css';
import Friend from '../Friends/Friend/Friend.js';
import StoreContext from '../../StoreContext';


let AvatarNav = (props) => {
  return (
    <StoreContext.Consumer>
      {
        (store) => {
          let avatarNav = [];
          for (let i = 0; i < 3; i++) {
            avatarNav[i] = <li><Friend avatar={store.getState().friends_information.friends[i].avatar} /></li>
          }

          return <ul className={classes.item}>
            {avatarNav}
          </ul>
        }}
    </StoreContext.Consumer>
  )
}

export default AvatarNav;