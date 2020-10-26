//Individual navigation item

import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.module.css';

import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    return (
    
        
        <li className={classes.NavigationItem}>
            <NavLink activeClassName={classes.active} exact to={props.link}>{props.children}</NavLink>
        </li>

    );
};

NavigationItem.propTypes = {
    
};

export default NavigationItem;