import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import { clearCurrentProfile } from "./store/actions/profileActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import "./App.css";

class App extends Component {
  componentDidMount() {
    //Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.props.setCurrentUser(decoded);

      // CHeck for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.props.logoutUser();
        // Clear current Profile
        this.props.clearCurrentProfile();
        // Redirect to login
        window.location.href = "/login";
      }
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/add-experience" component={AddExperience} />
            <Route path="/add-education" component={AddEducation} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:handle" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/feed" component={Posts} />
            <Route path="/post/:id" component={Post} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  logoutUser: () => dispatch(logoutUser()),
  clearCurrentProfile: () => dispatch(clearCurrentProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
