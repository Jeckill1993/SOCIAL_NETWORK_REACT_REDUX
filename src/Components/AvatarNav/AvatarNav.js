import React from 'react';
import classes from './AvatarNav.module.css';
import Friend from '../Friends/Friend/Friend.js';


const AvatarNav = (props) => {
  let avatarNav = [];
  for (let i = 0; i < 3; i++) {
    avatarNav[i] = <li><Friend key={props.friends[i].id} avatar={props.friends[i].avatar} /></li>
  }
  
  return (
    <ul className={classes.item}>
      {avatarNav}
    </ul>
  )
}

export default AvatarNav;