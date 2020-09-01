import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({ profile: { education } }) => {
    return (
        <Fragment>
            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                <div>
                    <h3>{ education.school }</h3>
                    <p>{ education.from } - { education.to }</p>
                    <p><strong>Degree: </strong>{ education.degree }</p>
                    <p><strong>Field Of Study: </strong>{ education.fieldofstudy}</p>
                    <p>
                        <strong>Description: </strong>{ education.description }
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileEducation
