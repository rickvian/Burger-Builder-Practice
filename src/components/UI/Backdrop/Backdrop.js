import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

const Backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);
    

Backdrop.propTypes = {
    
};

export default Backdrop;