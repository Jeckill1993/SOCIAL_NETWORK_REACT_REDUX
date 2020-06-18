import React, {Suspense, Component} from 'react';
import './App.css';
import './global_colors.css';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {initialize, changeThemeAC} from './redux/app_reducer';
import Preloader from './Components/common/Preloader/Preloader';
import HeaderContainer from './Components/Header/HeaderContainer';
import Navbar from './Components/Navbar/Navbar';
import {getNewMessages} from "./redux/dialogs_reducer";
import Footer from "./Components/Footer/Footer";
import {getNews} from "./redux/news_reducer";

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer.js'));
const Dialogs = React.lazy(() => import('./Components/Dialogs/Dialogs'));
const News = React.lazy(() => import('./Components/News/News'));
const Music = React.lazy(() => import('./Components/Music/Music'));
const Setting = React.lazy(() => import ('./Components/Setting/Setting'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));
const LoginPageContainer = React.lazy(() => import('./Components/Login/LoginPageContainer.js'));


class App extends Component {
    catchAllUnhandledError = (promiseRejectionEvent) => {
        
    }
    componentDidMount() {
        this.props.initialize();
        this.props.getNewMessages();
        this.props.getNews();
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
                <div className={`app-wrapper ${this.props.theme}_general`}>
                    <HeaderContainer/>
                    <div className="main">
                        <Navbar newMessagesCount={this.props.newMessagesCount} theme={this.props.theme}/>
                        <div className={`content ${this.props.theme}_content`}>
                            <Suspense fallback={<Preloader/>}>
                                <Switch>
                                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                                    <Route path="/dialogs/:userId?" render={() => <Dialogs/>}/>
                                    <Route path="/news" render={() => <News news={this.props.news} theme={this.props.theme}/>}/>
                                    <Route path="/music" render={() => <Music/>}/>
                                    <Route path="/setting" render={() => <Setting/>}/>
                                    <Route path="/users" render={() => <UsersContainer/>}/>
                                    <Route path="/login" render={() => <LoginPageContainer/>}/>
                                    <Route exact path="/" render={() => <Redirect to="/profile" />}/>
                                    <Route path="*" render={() => <div><h2>404 NOT FOUND</h2></div>}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                    <Footer changeTheme={this.props.changeTheme} theme={this.props.theme}/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    theme: state.app.theme,
    newMessagesCount: state.dialogs.newMessagesCount,
    news: state.news.news,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initialize, getNewMessages, changeTheme: changeThemeAC, getNews})
)(App);

