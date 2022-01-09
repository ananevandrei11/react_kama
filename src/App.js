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
  const users = props.state.dialogPage.users;
  const messages = props.state.dialogPage.messages;
  const posts = props.state.profilePage.posts;
  const friends = props.state.sideBar.friends;

  return (
    <div className="app-wrapper">
      <Header />
      <aside className="app-wrapper-sidebar">
        <Nav />
        <FriendsBar friends={friends} />
      </aside>
      <main className="app-wrapper-content">
        <Switch>
          <Route path="/dialogs">
            <Dialogs
              users={users}
              messages={messages}
              newMessage={props.state.dialogPage.newMessage}
              addMessage={props.addMessage}
              updateMessage={props.updateMessage}
            />
          </Route>

          <Route path="/profile">
            <Profile
              posts={posts}
              addPost={props.addPost}
              updatePost={props.updatePost}
              newPostText={props.state.profilePage.newPostText}
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
