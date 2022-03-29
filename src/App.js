import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import FriendsBar from "./Components/FriendsBar/FriendsBar";
import Footer from './Components/Footer/Footer';
import DialogsContainer from './Components/Dialogs/Dialogs';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <aside className="app-wrapper-sidebar">
        <Nav />
        <FriendsBar />
      </aside>
      <main className="app-wrapper-content">
        <Switch>
          <Route path="/dialogs">
            <DialogsContainer />
          </Route>

          <Route path="/profile">
            <ProfileContainer />
          </Route>

          <Route path="/users">
            <UsersContainer/>
          </Route>

          <Route path="/news">
            <News />
          </Route>

          <Route path="/music">
            <Music />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
