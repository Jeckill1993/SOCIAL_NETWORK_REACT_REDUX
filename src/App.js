import React from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import Navbar from './Components/Navbar/Navbar.js';
import ProfileContainer from './Components/Profile/ProfileContainer.js';
import Dialogs from './Components/Dialogs/Dialogs.js';
import News from './Components/News/News.js';
import Music from './Components/Music/Music.js';
import Setting from './Components/Setting/Setting.js';
import FriendsContainer from './Components/Friends/FriendsContainer';
import UsersContainer from './Components/Users/UsersContainer.js';

import { BrowserRouter, Route } from 'react-router-dom';



function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="container">
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <Dialogs />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/setting" render={() => <Setting />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/friends" render={() => <FriendsContainer />} />
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;

