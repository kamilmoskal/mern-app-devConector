import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../store/actions/postActions";

const PostItem = ({
  post,
  auth,
  showActions = true,
  deletePost,
  addLike,
  removeLike
}) => {
  const findUserLike = likes => {
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          {showActions ? (
            <React.Fragment>
              <button
                onClick={() => addLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={[
                    "fas",
                    "fa-thumbs-up",
                    findUserLike(post.likes) ? "text-info" : null
                  ].join(" ")}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={() => removeLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {post.user === auth.user.id ? (
                <button
                  onClick={() => deletePost(post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  addLike: id => dispatch(addLike(id)),
  removeLike: id => dispatch(removeLike(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
