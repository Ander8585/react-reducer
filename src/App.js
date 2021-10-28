import Contador from "./components/Contador";
import ContadorMejorado from "./components/ContadorMejorado";
import ShoppingCart from "./components/ShoppingCart";
import CrudApi from "./components/CrudApi";

function App() {
	return (
		<div>
			<h1>useReducer</h1>
			<hr />
			<CrudApi />
			<hr />
			<ShoppingCart />
			<hr />
			<ContadorMejorado />
			<hr />
			<Contador />
		</div>
	);
}

export default App;
