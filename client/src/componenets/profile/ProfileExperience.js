import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileExperience = ({ profile: { experience } }) => {
    return (
        <Fragment>
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                { experience.map((exp, index) => (
                    <div key={index}>
                        <h3 className="text-dark">{ exp.company }</h3>
                        <p>{ exp.from } - { exp.to }</p>
                        <p><strong>Position: </strong>{ exp.status }</p>
                        <p>
                            <strong>Description: </strong>{ exp.description }
                        </p>
                    </div>
                        )
                    )
                }     
            </div>    
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileExperience
