import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner'

const Dashboard = ({ getProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getProfile()
    }, [])

    

    return loading && profile === null ? <Spinner /> : 
        <Fragment>  
            <h1 className='large text-primary'>Dashboard</h1> 
            <p className='lead'>
            <i className='fas fa-user'></i> Welcome { user && user.name }</p>
            { profile ? <Fragment><p>has</p></Fragment> : <Fragment>
                <p>You currently do not have a profile, Please tell us more about you</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
            </Fragment>}
        </Fragment>
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile })(Dashboard);
