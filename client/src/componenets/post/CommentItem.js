import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post'

const CommentItem = ({ comment, auth, deleteComment, postId }) => {
    return (
        <Fragment>
                <div className="post bg-white p-1 my-1">
                    <div>
                        <Link to={`/profile/{comment.user`}>
                            <img
                            className="round-img"
                            src={ comment.avatar }
                            alt=""
                            />
                            <h4>{ comment.name} </h4>
                        </Link>
                    </div>
                    <div>
                        <p className="my-1">
                            { comment.text }
                        </p>
                        <p className="post-date">
                            Posted on <Moment format='YYYY/MM/DD'>{ comment.date }</Moment>
                        </p>

                        { !auth.loading && auth.user._id === comment.user && 
                            <button      
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteComment(postId, comment._id)}
                            >
                            <i className="fas fa-times"></i>
                            </button>
                        }
                        
                    </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
