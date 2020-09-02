import { GET_POSTS, POST_ERROR, MAKE_POST, UPDATE_LIKES, DELETE_POST } from '../actions/constants'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: {}
}

const post = (state=initialState, action) => {
    const { type, payload } = action
        switch(type) {
            case MAKE_POST:
            case GET_POSTS:
                return {
                    ...state,
                    posts: payload,
                    loading: false,
                }
            case UPDATE_LIKES:
                return {
                    ...state,
                    posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
                    loading: false
                }
            case DELETE_POST:
                return {
                    ...state,
                    posts: state.posts.filter(post => post._id !== payload.postId),
                    loading: false
                }
            case POST_ERROR:
                return {
                    ...state,
                    errors: payload,
                    loading: false,
                }
            default:
                return state
        }
}

export default post;

