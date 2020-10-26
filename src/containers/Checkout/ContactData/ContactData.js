import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name : '',
        email: '',
        address : {
            street : '',
            postalCode : ''
        },
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
          // alert('You Continued!');
        this.setState({ loading: true });

        const order = {
        ingredients: this.props.ingredients,
        price:this.props.price,
        customer : {
            name: 'Rickvian',
            address: {
            street: 'Thisisaddress',
            zipCode:'12341',
            country: 'Germany'
            },
            email:'test@test.com'
        },
        deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(response => {
        this.setState({loading:false});
        this.props.history.push('/');
        // console.log(response);
        })
        .catch(error => {
        this.setState({loading:false});
        // console.log(error);
        });

        console.log(this.props.ingredients);

        
    }
    render() {
        let form = ( 
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
       );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
           
            <h4>Enter your Contact Data</h4>
           {form}
           </div>
        );
    }
}

export default ContactData;