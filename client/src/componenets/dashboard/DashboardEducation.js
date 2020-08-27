import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const DashboardEducation = ({ educations }) => {
    const education = educations.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm' >{edu.degree}</td>
            <td className='hide-sm'>
                <Moment format='YYYY/MM/12'>{edu.from}</Moment> - 
                { edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </td>
            <td> <button className='btn btn-danger'>Delete Now </button></td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{education}</tbody>
            </table>
        </Fragment>
    )
}

DashboardEducation.propTypes = {
    educations: PropTypes.array.isRequired,
}

export default connect()(DashboardEducation);
