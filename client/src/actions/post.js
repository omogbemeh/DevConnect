import { GET_POSTS, POST_ERROR, MAKE_POST, PROFILE_ERROR, UPDATE_LIKES, DELETE_POST, GET_POST, MAKE_COMMENT, DELETE_COMMENT } from './constants';
import axios from 'axios'
import { setAlert } from './alert'
import Axios from 'axios';

export const getPosts = () => async dispatch => {
    const res = await axios.get('/api/posts')
    try {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText}
        })
    }
}

export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.statusText}
        })
    }
}

export const makePosts = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config);
        dispatch({
            type: MAKE_POST,
            payload: res.data
        })     
        dispatch(setAlert('Post Added', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR
        })
    } 
}

export const likePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }) 
    }
}

export const unlikePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)      
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        })
        dispatch(setAlert('Post Deleted', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }) 
    }
}

export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postId}`)      
        dispatch({
            type: DELETE_POST,
            payload: postId 
        })
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }) 
    }
}

export const makeComment = (formData, postId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: MAKE_COMMENT,
            dispatch: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: DELETE_COMMENT,
            payload: postId 
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}