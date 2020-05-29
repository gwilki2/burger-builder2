import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5, 
    bacon: 0.7, 
    cheese: 0.4, 
    meat: 1.3

};

class BurgerBuilder extends React.Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0
        }, 
        totalPrice: 4, 
        purchasable: false, 
        purchasing: false
    }
    
    updatePurchaseState = () =>{
        this.setState((prevState) => {
            const purchasable = Object
                .keys(prevState.ingredients)
                .some(igKey => prevState.ingredients[igKey]>0)

            return {purchasable}
        }
            
        ); 
    }

    addIngredientHandler =(type) => {
        this.setState((prevState) => {

            const updatedIngredients={
                ...prevState.ingredients
            };
            updatedIngredients[type] = prevState.ingredients[type] + 1;

            return {
                    totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type], 
                    ingredients: updatedIngredients
                }
        });
        this.updatePurchaseState();
    }

    removeIngredientHandler =(type) => {
        this.setState((prevState) => {

            const hasAtLeastOneItem = (prevState.ingredients[type]>0)

            const updatedIngredients={
                ...prevState.ingredients
            };
            updatedIngredients[type] = hasAtLeastOneItem ? (prevState.ingredients[type] - 1) : 0;

            return {
                    totalPrice: hasAtLeastOneItem ? (prevState.totalPrice - INGREDIENT_PRICES[type]) : prevState.totalPrice, 
                    ingredients: updatedIngredients
                }
        });
        this.updatePurchaseState();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => {

        alert('You want to continue')
    }

    render(){

        const disabledInfo ={};

        for (let key in this.state.ingredients){
            disabledInfo[key] = (this.state.ingredients[key] <= 0);
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler} 
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled ={this.purchaseCancelHandler}
                        purchaseContinued ={this.purchaseContinueHandler}
                        price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;