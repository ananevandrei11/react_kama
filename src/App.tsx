import React from 'react';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import store from './Redux/reduxStore';
import './App.css';
import Nav from './Components/Nav/Nav';
import FriendsBar from './Components/FriendsBar/FriendsBar';
import Footer from './Components/Footer/Footer';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Header from './Components/Header/Header';
import { initializeApp } from './Redux/appReducer';
import Preloder from './Components/Preloader/Preloader';
import { withSuspense } from './HOC/WithSuspense';
import { AppStateType } from './Redux/reduxStore';

type AppMapPropsType = ReturnType<typeof mapStateToProps>;
type AppDispatchPropsType = {
  initializeApp: () => void;
};

const DialogsContainer = React.lazy(
  () => import('./Components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(
  () => import('./Components/Profile/ProfileContainer')
);

const UsersContainer = React.lazy(
  () => import('./Components/Users/UsersContainer')
);

const Login = React.lazy(() => import('./Components/Login/Login'));
const ChatPage = React.lazy(() => import('./Pages/Chat/ChatPage'));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedUsers = withSuspense(UsersContainer);
const SuspendedLogin = withSuspense(Login);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends React.Component<AppMapPropsType & AppDispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloder />;
    }

    return (
      <div className="app-wrapper">
        <Header />
        <aside className="app-wrapper-sidebar">
          <Nav />
          <FriendsBar />
        </aside>
        <main className="app-wrapper-content">
          {/* @ts-ignore */}
          <Switch>
            {/* @ts-ignore */}
            <Route path="/dialogs" render={() => <SuspendedDialogs />} />
            {/* @ts-ignore */}
            <Route
              path="/profile/:userID?"
              render={() => <SuspendedProfile />}
            />
            {/* @ts-ignore */}
            <Route path="/users" render={() => <SuspendedUsers />} />
            {/* @ts-ignore */}
            <Route path="/chat" render={() => <SuspendedChatPage />} />
            {/* @ts-ignore */}
            <Route path="/news">
              <News />
            </Route>
            {/* @ts-ignore */}
            <Route path="/music">
              <Music />
            </Route>
            {/* @ts-ignore */}
            <Route path="/login" render={() => <SuspendedLogin />} />
            {/* @ts-ignore */}
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => (
  // @ts-ignore
  <BrowserRouter>
    {/* @ts-ignore */}
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
);

export default SamuraiJSApp;
