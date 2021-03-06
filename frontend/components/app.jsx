import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util.js';
import NavBar from './navbar.jsx';
import Modal from './modal.jsx';
import SplashMain from './splash_main.jsx';
import TrackCreateForm from './tracks/track_create_form_container.js';
import TrackShow from './tracks/track_show_container.js';
import TrackIndex from './tracks/track_index_container.js';
import Player from './player/player_container';
import UserShow from './user/user_container';
import Home from './home_page.jsx';

const App = () => (
  <div>
    <Modal></Modal>
    <NavBar></NavBar>
    <div id="main">
      <AuthRoute exact path="/" component={SplashMain}></AuthRoute>
      <Switch>
        <ProtectedRoute exact path="/tracks/new" component={TrackCreateForm}></ProtectedRoute>
        <Route exact path="/home/:listType" component={Home}></Route>
        <Route exact path='/tracks/:trackId' component={TrackShow}></Route>
        <Route path='/users/:userId' component={UserShow}></Route>
      </Switch>
    </div>
    <Player></Player>
  </div>
);


export default App;
