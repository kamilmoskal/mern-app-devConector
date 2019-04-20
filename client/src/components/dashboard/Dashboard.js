import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount,
  deleteExperience,
  deleteEducation
} from "../../store/actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteAccount = e => {
    this.props.deleteAccount();
  };
  onDeleteExperience = id => {
    this.props.deleteExperience(id);
  };
  onDeleteEducation = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { profile, loading } = this.props.profile;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience
              experience={profile.experience}
              deleteExperience={this.onDeleteExperience}
            />
            <Education
              education={profile.education}
              deleteEducation={this.onDeleteEducation}
            />
            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteAccount} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  deleteAccount: () => dispatch(deleteAccount()),
  deleteExperience: id => dispatch(deleteExperience(id)),
  deleteEducation: id => dispatch(deleteEducation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
