import AvatarNav from './AvatarNav.js';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        friends: state.friends_information.friends,
    }
}

const AvatarNavContainer = connect(mapStateToProps)(AvatarNav)

export default AvatarNavContainer;