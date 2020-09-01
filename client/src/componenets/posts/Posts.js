import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostComponent from './PostComponent';
import PostItem from './PostItem';

const Posts = ({ post, getPosts }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    
    if ( post.loading ) return <Spinner />
    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
            <PostComponent />
            <div>
                { post.posts.map((post, index) => <PostItem key={index} post={post} />)}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
