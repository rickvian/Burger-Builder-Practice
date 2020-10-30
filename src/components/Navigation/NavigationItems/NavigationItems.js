//Container of the navigation items

import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

import { Switch } from 'react-router-dom';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            { props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem>

            }

        </ul>
    );
};

NavigationItems.propTypes = {

};

export default NavigationItems;