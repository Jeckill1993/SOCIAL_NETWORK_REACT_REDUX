import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer.js';
import Navbar from './Components/Navbar/Navbar.js';
import ProfileContainer from './Components/Profile/ProfileContainer.js';
import Dialogs from './Components/Dialogs/Dialogs.js';
import News from './Components/News/News.js';
import Music from './Components/Music/Music.js';
import Setting from './Components/Setting/Setting.js';
import FriendsContainer from './Components/Friends/FriendsContainer';
import UsersContainer from './Components/Users/UsersContainer.js';
import LoginContainer from './Components/Login/LoginContainer.js';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { initialize } from './redux/app_reducer.js';
import Preloader from './Components/common/Preloader/Preloader';



class App extends Component {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="container">
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialogs" render={() => <Dialogs />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/setting" render={() => <Setting />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/friends" render={() => <FriendsContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initialize })
)(App);

