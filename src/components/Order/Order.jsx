import React from 'react';
import classes from './Order.module.css';
const order = (props) => {

    //You received ingredient as object which cannot be looped in component, conver to array first...
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        console.log(ingredientName);
        console.log(props.ingredients[ingredientName]);
        console.log(props.ingredients);
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig=>{
        return <span 
        style={{textTransform:'capitalize',
    display:'inline-block',
margin: '0 8px',
border:'1px solid black',
padding:'5px'}}
        key={ig.name}>{ig.name} ({ig.amount}) </span>
    })

    //Then show the component UI

    return (<div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>
            Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
        </p>
    </div>);


};

export default order;