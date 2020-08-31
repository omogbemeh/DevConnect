import React, { Fragment }from 'react';
import AddProfiles from './AddProfiles';

export const Profiles = () => {
    return (
        <div>
        <Fragment>  
            <h1 className='large text-primary'>Developers</h1> 
            <p className='lead'>
            <i className='fab fa-connectdevelop'></i>Browse and Connect with Developers</p>
            <AddProfiles />
        </Fragment>
        </div>
    )
}

export default Profiles;