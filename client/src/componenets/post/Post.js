import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem'
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match, getPost, post }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    if ( post === null || post.loading ) return <Spinner />;

    return (
        <Fragment>
            <PostItem post={post} />
            <CommentForm postId={post._id}/>
            <div className='comments'>
                { post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id}/>  )}
            </div>
        </Fragment>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post.post
})

export default connect(mapStateToProps, { getPost })(Post);
