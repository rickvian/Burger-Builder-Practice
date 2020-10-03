import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/AuxComponent/AuxComponent";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //this could be a functional component, instead of class component
  componentDidUpdate(){
    console.log('[OrderSummary] Will Update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue with checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {};

export default OrderSummary;
