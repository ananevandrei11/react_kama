import React, { PropsWithChildren } from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  RouteProps,
  RouteChildrenProps,
} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav/Nav';
import FriendsBar from './Components/FriendsBar/FriendsBar';
import Footer from './Components/Footer/Footer';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import HeaderContainer from './Components/Header/HeaderContainer';
import { initializeApp } from './Redux/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloder from './Components/Preloader/Preloader';
import { withSuspense } from './HOC/WithSuspense';
import { AppStateType } from './Redux/reduxStore';

type AppMapPropsType = ReturnType<typeof mapStateToProps>;
type AppDispatchPropsType = {
  initializeApp: () => void;
};

const DialogsContainer = React.lazy(
  () => import('./Components/Dialogs/Dialogs')
);

const ProfileContainer = React.lazy(
  () => import('./Components/Profile/ProfileContainer')
);

const UsersContainer = React.lazy(
  () => import('./Components/Users/UsersContainer')
);

const Login = React.lazy(() => import('./Components/Login/Login'));

const SuspendedDialog = withSuspense(DialogsContainer);

class App extends React.Component<
  AppMapPropsType & AppDispatchPropsType
> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloder />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <aside className="app-wrapper-sidebar">
          <Nav />
          <FriendsBar />
        </aside>
        <main className="app-wrapper-content">
          <Switch>
            <Route path="/dialogs" render={() => <SuspendedDialog />} />

            <Route
              path="/profile/:userID?"
              render={withSuspense(ProfileContainer)}
            />

            <Route path="/users" render={withSuspense(UsersContainer)} />

            <Route path="/news">
              <News />
            </Route>

            <Route path="/music">
              <Music />
            </Route>

            <Route path="/login" render={withSuspense(Login)} />

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

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
