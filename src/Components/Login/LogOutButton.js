import React from 'react';


const LogOutButton = (props) => {
    let logOut = () => {
        props.logOut();
    }

    return (
        <div>{props.login}
            <div>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LogOutButton;