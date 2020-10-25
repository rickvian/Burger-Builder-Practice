import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';


const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>
                We hope it tastes well!
            </h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
        </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
};

CheckoutSummary.propTypes = {
    
};

export default CheckoutSummary;