import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makePosts } from '../../actions/post'
import { connect } from 'react-redux';

const PostComponent = ({ makePosts }) => {
    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.name = e.target.value )
    }

    const onSubmit = (e) => {
        e.preventDefault();
        makePosts({ text });
        setText('');
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text} onChange={e => onChange(e)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostComponent.propTypes = {
    makePosts: PropTypes.func.isRequired,
}

export default connect(null, { makePosts })(PostComponent);
