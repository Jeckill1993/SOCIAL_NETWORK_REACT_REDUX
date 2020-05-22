import React, {Suspense, Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {initialize} from './redux/app_reducer.js';
import Preloader from './Components/common/Preloader/Preloader.js';
import HeaderContainer from './Components/Header/HeaderContainer.js';
import Navbar from './Components/Navbar/Navbar.js';
import {getNewMessages} from "./redux/dialogs_reducer";

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer.js'));
const Dialogs = React.lazy(() => import('./Components/Dialogs/Dialogs.js'));
const News = React.lazy(() => import('./Components/News/News.js'));
const Music = React.lazy(() => import('./Components/Music/Music.js'));
const Setting = React.lazy(() => import ('./Components/Setting/Setting.js'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer.js'));
const FriendsContainer = React.lazy(() => import('./Components/Friends/FriendsContainer'));
const LoginPageContainer = React.lazy(() => import('./Components/Login/LoginPageContainer.js'));


class App extends Component {
    catchAllUnhandledError = (promiseRejectionEvent) => {
        
    }
    componentDidMount() {
        this.props.initialize();
        this.props.getNewMessages();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledError);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar newMessagesCount={this.props.newMessagesCount} />
                    <div className="container">
                        <Suspense fallback={<Preloader/>}>
                            <Switch>
                                <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                                <Route path="/dialogs/:userId?" render={() => <Dialogs/>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/setting" render={() => <Setting/>}/>
                                <Route path="/users" render={() => <UsersContainer/>}/>
                                <Route path="/friends" render={() => <FriendsContainer/>}/>
                                <Route path="/login" render={() => <LoginPageContainer/>}/>
                                <Route exact path="/" render={() => <Redirect to="/profile" />}/>
                                <Route path="*" render={() => <div><h2>404 NOT FOUND</h2></div>}/>
                            </Switch>
                        </Suspense>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    newMessagesCount: state.dialogs.newMessagesCount,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initialize, getNewMessages})
)(App);

