import React from 'react';
import Friends from './Friends.js';
import { connect } from 'react-redux';


let mapStatetoProps = (state) => {
    return {
        friends: state.friends_information.friends,
    }
}

const FriendsContainer = connect(mapStatetoProps)(Friends);

export default FriendsContainer;