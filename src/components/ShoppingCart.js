import React, { useReducer } from "react";
import { shoppingReducer } from "../reducers/shoppingReducer";
import { shoppingInitialState } from "./../reducers/shoppingReducer";
import CartItem from "./CartItem";
import ProductItem from "./ProductItem";
import { TYPES } from "./../actions/shoppingAction";

const ShoppingCart = () => {
	const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
	const { products, cart, totalCost } = state;

	const addToCart = (id) => {
		//console.log(id);
		dispatch({ type: TYPES.ADD_TO_CART, payload: id });
		getTotalCost();
	};

	const delFromCart = (id, all = false) => {
		if (all) dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
		else dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
		getTotalCost();
	};

	const clearCart = () => {
		dispatch({ type: TYPES.CLEAR_CART });
	};

	const getTotalCost = () => {
		dispatch({ type: TYPES.TOTAL_COST });
	};

	return (
		<div>
			<h2>Carrito de Compras</h2>
			<h3>Productos</h3>
			<article className="box grid-responsive">
				{products.map((product) => (
					<ProductItem key={product.id} data={product} addToCart={addToCart} />
				))}
			</article>
			<h3>Carrito</h3>
			<article className="box">
				<button onClick={clearCart}>Limpiar Carrito</button>
				{cart.map((item, index) => (
					<CartItem key={index} data={item} delFromCart={delFromCart} />
				))}
			</article>
			<h2>TOTAL: ${totalCost}.00</h2>
		</div>
	);
};

export default ShoppingCart;
