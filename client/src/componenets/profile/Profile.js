import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitHub from './ProfileGitHub';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    if (profile === null || loading) return <Spinner />;
   
    return (
        <Fragment>
            <Link to="/profiles" className="btn my-1 btn-light">Back To Profiles</Link>
                { auth.isAuthenticated && auth.loading === false && auth.user.id === profile.user.id && <Link to='/edit-profile' 
                className='btn btn-light'>
                    Edit Profile
            </Link>} 
            <div class="profile-grid my-1">
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <ProfileExperience profile={profile}/>
                <ProfileEducation profile={profile} />
                { profile.githubusername &&  <ProfileGitHub username={profile.githubusername}/> } 
            </div>   
        </Fragment>
        )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)

 