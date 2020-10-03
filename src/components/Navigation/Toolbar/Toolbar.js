import React from 'react';
import PropTypes from 'prop-types';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div>
                MENU
            </div>
            <div>LOGO</div>
            <nav>
                ...
            </nav>
        </header>
    );
};

Toolbar.propTypes = {
    
};

export default Toolbar;