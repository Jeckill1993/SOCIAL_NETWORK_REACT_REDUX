import React from 'react';


const Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            { id: '101', followed: true, name: 'Dimooon B', location: { county: 'Ukraine', city: 'Kiev' }, status: 'I am looking for QA', avatar: 'https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png' },
            { id: '102', followed: false, name: 'Svetlana G', location: { county: 'Russia', city: 'Moscow' }, status: 'I am looking for CopyWritter', avatar: 'https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png' },
            { id: '103', followed: true, name: 'Dartanian L', location: { county: 'France', city: 'Paris' }, status: 'I am looking for C++ developer', avatar: 'https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png' },
            { id: '104', followed: false, name: 'John S', location: { county: 'USA', city: 'Chicago' }, status: 'I am looking for Front End developer', avatar: 'https://cs11.pikabu.ru/post_img/2018/10/16/10/1539710350186150878.png' },
        ]);
    }

    let userItem = props.users.map((user) => {
        return <div key={user.id}>
            <span>
                <div>
                    <img src={user.avatar} alt="avatar"></img>
                </div>
                <div>
                    {user.followed ? <button onClick={() => { props.unfollowUser(user.id) }}>UnFollow</button>
                        : <button onClick={() => { props.followUser(user.id) }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{user.location.country}</div>
                    <div>{user.location.city}</div>
                </span>
            </span>
        </div>
    })

    return (
        <div>
            {userItem}
        </div>
    )

}

export default Users;