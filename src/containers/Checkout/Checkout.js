import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // Component will mount is too late, dispatch not done, but the render is done, it gets redirected
    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }


    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    //migrated to redux to handle
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         //['salad','1']
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }

    //     this.setState({ingredients : ingredients, totalPrice : price});
    // }
    checkoutCanceledhandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHanlder = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />


        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledhandler}
                        checkoutContinued={this.checkoutContinuedHanlder} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitPurchase: () => {
//             dispatch(actions.purchaseInit())
//         }
//     }
// }
export default connect(mapStateToProps)(Checkout);