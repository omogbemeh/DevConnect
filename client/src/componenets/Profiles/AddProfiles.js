import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../../componenets/layout/Spinner'

const AddProfiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [])

  const profile = profiles.map( prof => (
    <Fragment key={prof._id}>
          <div className="profile bg-light">
            <img
              className="round-img"
              src={ prof.user.avatar }
              alt=""
            />
            <div>
              <h2>{ prof.user.name }</h2>
              <p>{ prof.status} { prof.company && <span> at {prof.company}</span>}</p>
              <p>{ prof.location }</p>
              <Link to={`/profile/${prof.user._id}`} className="btn btn-primary">View Profile</Link>
            </div>
            { prof.skills.length > 0 && 
              <ul>
              { prof.skills.slice(0,4).map((skill, index) => (
                  <li key={index} className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                  </li>
              ))}
              </ul>
               
             }
        </div>

        
    </Fragment>
  ))
  
  return <Fragment> 
            { loading ? <Spinner /> : profile }
        </Fragment>


}

AddProfiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(AddProfiles);

