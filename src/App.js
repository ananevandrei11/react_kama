import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import FriendsBar from "./Components/FriendsBar/FriendsBar";
import Profile from './Components/Profile/Profile';
import Footer from './Components/Footer/Footer';
import Dialogs from './Components/Dialogs/Dialogs';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <aside className="app-wrapper-sidebar">
        <Nav />
        <FriendsBar store={props.store} />
      </aside>
      <main className="app-wrapper-content">
        <Switch>
          <Route path="/dialogs">
            <Dialogs
              store={props.store}
            />
          </Route>

          <Route path="/profile">
            <Profile
              store={props.store}
            />
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
