import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../store/actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="fee">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
