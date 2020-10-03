import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/AuxComponent";
const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
          Continue with checkout?
      </p>
    </Aux>
  );
};

OrderSummary.propTypes = {};

export default OrderSummary;
