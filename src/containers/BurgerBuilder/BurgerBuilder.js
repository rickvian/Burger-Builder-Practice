import React, { Component } from "react";

import Aux from "../../hoc/AuxComponent/AuxComponent";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  // constructor(props){
  //     suprot(props);
  //     this.state = {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing:false,
    loading:false,
    error: false
  };

  componentDidMount(){
    axios.get('https://burger-project-10da5.firebaseio.com/ingredients.json')
    .then(response=>{
      this.setState({ ingredients: response.data});
    }).catch(error =>{
      this.setState({error:true});
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    console.log(sum);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = oldCount + 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = oldCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () =>{
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () =>{
    this.setState({loading:true});
    // alert('You Continued!');
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price:this.state.totalPrice,
    //   customer : {
    //     name: 'Rickvian',
    //     address: {
    //       street: 'Thisisaddress',
    //       zipCode:'12341',
    //       country: 'Germany'
    //     },
    //     email:'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // axios.post('/order.json', order)
    // .then(response => {
    //   this.setState({loading:false, purchasing:false});
    //   // console.log(response);
    // })
    // .catch(error => {
    //   this.setState({loading:false, purchasing:false});
    //   // console.log(error);
    // });
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
    }
     const queryString = queryParams.join('&');
    this.props.history.push({
      pathname : '/checkout',
      search : '?' + queryString
    });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients Can't be loaded!</p> : <Spinner/>;

    if(this.state.ingredients){
      burger =  (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            purchaseable={this.state.purchaseable}
          />
        </Aux>
        );

      orderSummary = <OrderSummary ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancelHandler={this.purchaseCancelHandler}
      purchaseContinueHandler={this.purchaseContinueHandler}/>;
      if(this.state.loading){
        orderSummary = <Spinner/>
      }
  
    }

    //{salad: true, meat:false ...}
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
