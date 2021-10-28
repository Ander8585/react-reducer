import React from "react";

const CartItem = ({ data, delFromCart }) => {
	let { id, name, price, quantity } = data;

	return (
		<div style={{ borderBottom: "thin solid gray", padding: "1rem" }}>
			<h4>
				{name} X {quantity}
			</h4>
			<h5>
				${price}.00 x {quantity} = ${price * quantity}.00
			</h5>
			<button onClick={() => delFromCart(id)}>Eliminar Uno</button>
			<button onClick={() => delFromCart(id, true)}>Eliminar Todos</button>
		</div>
	);
};

export default CartItem;
