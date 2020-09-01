import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile }) => {
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                <img className="round-img my-1" src={profile.user.avatar} alt="" />
                <h1 className="large">{profile.user.name}</h1>
                <p className="lead">{profile.status} at {profile.company && <span> at {profile.company}</span>}</p>
                <p>{profile.location}</p>
                <div className="icons my-1">
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </Link>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </Link>
                </div>
            </div>     
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
