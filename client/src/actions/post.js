import { GET_POSTS, POST_ERROR, MAKE_POST, PROFILE_ERROR, UPDATE_LIKES } from './constants';
import axios from 'axios'
import { setAlert } from './alert'

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
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }) 
    }
}

export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)      
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