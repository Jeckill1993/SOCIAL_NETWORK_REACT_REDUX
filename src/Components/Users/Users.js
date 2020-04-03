import React from 'react';
import * as Axios from 'axios';
import userPhoto from '../../assets/images/user.jpg';
import classes from './Users.module.css';


class Users extends React.Component {
    componentDidMount() {
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUserCount(response.data.totalCount);
        });
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return <div>
            <div>
                {pages.map((page) => {
                    return <span onClick={() => {this.onPageChanged(page)}} className={this.props.currentPage === page && classes.selected}>{page}</span>
                })}
            </div>
            {
                this.props.users.map((user) => <div key={user.id}>
                    <span>
                        <div>
                            <img className={classes.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar"></img>
                        </div>
                        <div>
                            {user.followed ? <button onClick={() => { this.props.unfollowUser(user.id) }}>UnFollow</button>
                                : <button onClick={() => { this.props.followUser(user.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
                </div>
                )}
        </div>
    }
}

export default Users;