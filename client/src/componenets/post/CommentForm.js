import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeComment } from '../../actions/post';

const CommentForm = ({ makeComment, postId }) => {
    const [text, setText] = useState('');
    
    return (
        <Fragment>
            <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" 
                onSubmit={e => {
                    e.preventDefault();
                    makeComment({ text }, postId)
                }}>
            <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                value={text}
                onChange={e => setText(e.target.value)}
                required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
        </Fragment>
    )
}

CommentForm.propTypes = {
    makeComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(null, { makeComment })(CommentForm)
