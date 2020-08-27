import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile'

const DashboardExperience = ({ experiences, deleteExperience }) => {
    const experience = experiences.map(experience => (
        <tr key={experience._id}>
            <td>{experience.company}</td>
            <td className='hide-sm' >{experience.title}</td>
            <td className='hide-sm'>
                <Moment format='YYYY/MM/12'>{experience.from}</Moment> - 
                { experience.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{experience.to}</Moment>}
            </td>
            <td> <button className='btn btn-danger' onClick={e => deleteExperience(experience._id)}>Delete Now </button></td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experience}</tbody>
            </table>
        </Fragment>
    )
}

DashboardExperience.propTypes = {
    experiences: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect( null, { deleteExperience })(DashboardExperience);
