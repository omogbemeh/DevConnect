import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { likePost } from '../../actions/post';
import { unlikePost } from '../../actions/post';

const PostItem = ({ post, auth, likePost, unlikePost }) => {
    return (
        <Fragment>
                <div className="posts">
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                            <img
                                className="round-img"
                                src={ post.avatar }
                                alt=""
                            />
                            <h4>{ post.user.name }</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                            { post.text }
                            </p>
                            <p className="post-date">
                                Posted on <Moment>{ post.date }</Moment>
                            </p>
                            <button onClick={() => likePost(post._id)} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-up"></i>{' '}
                            { post.likes.length > 0 && (<span>{post.likes.length}</span>)}
                            </button>
                            <button onClick={() => unlikePost(post._id)} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-down"></i>
                            </button>
                            <a href="post.html" className="btn btn-primary">
                            Discussion{' '}
                            { post.comments.length > 0 && (<span className='comment-count'>{ post.comments.length }</span>)}
                            </a>
                            { post.loading === false && post.user === auth.user.id && 
                                <button      
                                type="button"
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                         }
                            
                        </div>
                </div>
            </div>      
        </Fragment>
        )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { likePost, unlikePost })(PostItem);