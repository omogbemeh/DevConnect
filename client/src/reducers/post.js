import { GET_POSTS, POST_ERROR, MAKE_POST, UPDATE_LIKES, DELETE_POST, GET_POST, MAKE_COMMENT, DELETE_COMMENT } from '../actions/constants'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: {}
}

const post = (state=initialState, action) => {
    const { type, payload } = action
        switch(type) {
            case GET_POSTS:
                return {
                    ...state,
                    posts: payload,
                    loading: false,
                }
            case GET_POST:
                return{
                    ...state,
                    post: payload,
                    loaging: false
                }
            case MAKE_POST:
                return {
                    ...state,
                    posts: [payload, ...state.posts],
                    loading: false
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
                    posts: state.posts.filter(post => post._id !== payload),
                    loading: false
                }
            case MAKE_COMMENT:
                return {
                    ...state,
                    post: { ...state.post, comment: payload},
                    loading: false
                }
            case DELETE_COMMENT:
                return {
                    ...state,
                    post: {
                        ...state.post,
                        comments: state.post.comments.filter(comment => comment._id !== payload)
                    },
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

