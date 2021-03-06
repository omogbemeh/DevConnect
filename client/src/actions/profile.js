import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, CLEAR_PROFILE, GET_REPOS, DELETE_ACCOUNT,  } from './constants';
import axios from 'axios';
import { setAlert } from './alert';

// Get Profile
export const getProfile = () => async dispatch  => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
        })
    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile')
    dispatch({
        type: GET_PROFILES,
        payload: res.data
    })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
        })
    }   
}

//Get profile by userId
export const getProfileById = userId => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
        })
    }
}

//Get Github repo for a user
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({
            type: GET_REPOS,
            dispatch: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR
        })

    }
}

// Create and Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {history.push('/dashboard')};

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
    
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.map(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        } 
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    };
    
};

export const addEducation = (formData, history) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const res = await axios.put('/api/profile/education', formData, config);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Added', 'success'));
  
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/experience/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Removed', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'dnager')))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
        type: GET_PROFILE,
        payload: res.data
    })
    dispatch(setAlert('Education Removed', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        errors.map(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are youb Sure ? This can NOT be undone.')) {
        try {
            const res = await axios.delete('/api/profile')
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: DELETE_ACCOUNT})

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
        }
    }
    
    
}