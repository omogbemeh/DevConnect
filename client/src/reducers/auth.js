import { REGISTER_SUCCESS, 
         REGISTER_FAIL,
         USER_LOADED, 
         AUTH_ERROR, 
         LOGIN_SUCCESS, 
         LOGIN_FAIL,
         LOGOUT,
         DELETE_ACCOUNT
    } from '../actions/constants'

const initialState = {
    isAuthenticated: null,
    token: localStorage.getItem('token'),
    loading: true,
    user: null
};

export const register = (state = initialState, action) => {
    const { type, payload } = action 
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
        }

}

export default register