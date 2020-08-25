import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/constants';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

const profile = (state=initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: []
            }
        default:
            return state
    }
};

export default profile;