import React, { Fragment } from 'react';
import earth from './preloaders/Earth.gif';

export default () => (
    <Fragment>
        <img
            src={earth} 
            style={{ width: '200px', margin: 'auto', display: 'block'}}
            alt='Loading'
        />
    </Fragment>
)

