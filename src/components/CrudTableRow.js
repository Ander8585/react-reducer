import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
	const { name, constellation } = el;

	return (
		<>
			<tr>
				<td>{name}</td>
				<td>{constellation}</td>
				<td>
					<button onClick={() => setDataToEdit(el)}>Editar</button>
					<button onClick={() => deleteData(el)}>Eliminar</button>
				</td>
			</tr>
		</>
	);
};

export default CrudTableRow;
