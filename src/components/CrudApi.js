/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useReducer } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "./../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
import { crudInitialState, crudReducer } from "../reducers/crudReducer";
import { TYPES } from "./../actions/crudActions";

const CrudApi = () => {
	//const [db, setDb] = useState(null);
	const [state, dispatch] = useReducer(crudReducer, crudInitialState);
	const { db } = state;
	const [dataToEdit, setDataToEdit] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	let api = helpHttp();
	let url = "http://localhost:5000/santos";

	useEffect(() => {
		setLoading(true);
		api.get(url).then((res) => {
			//console.log(res);
			if (!res.err) {
				//setDb(res);
				dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
				setError(null);
			} else {
				//setDb(null);
				dispatch({ type: TYPES.NO_DATA });
				setError(res);
			}

			setLoading(false);
		});
	}, []);

	const createData = (data) => {
		data.id = Date.now();

		let options = {
			body: data,
			headers: { "content-type": "application/json" },
		};

		api.post(url, options).then((res) => {
			//console.log(res);
			if (!res.err) {
				//setDb([...db, res]);
				dispatch({ type: TYPES.CREATE_DATA, payload: res });
			} else {
				setError(res);
			}
		});
	};

	const updateData = (data) => {
		let endpoint = `${url}/${data.id}`;
		let options = {
			body: data,
			headers: { "content-type": "application/json" },
		};

		api.put(endpoint, options).then((res) => {
			//console.log(res);
			if (!res.err) {
				//let newData = db.map((el) => (el.id === data.id ? data : el));
				//setDb(newData);
				dispatch({ type: TYPES.UPDATE_DATA, payload: data });
			} else {
				setError(res);
			}
		});
	};

	const deleteData = (data) => {
		let isDelete = window.confirm(
			`Estas seguro de eliminar el registro con el nombre "${data.name}" e ID "${data.id}"`
		);
		let endpoint = `${url}/${data.id}`;
		let options = {
			headers: { "content-type": "application/json" },
		};

		if (isDelete) {
			api.del(endpoint, options).then((res) => {
				//console.log(res);
				if (!res.err) {
					//let newData = db.filter((el) => el.id !== data.id);
					//setDb(newData);
					dispatch({ type: TYPES.DELETE_DATA, payload: data });
				} else {
					setError(res);
				}
			});
		}
	};

	return (
		<div>
			<h2>CRUD API</h2>
			<article className="grid-1-2">
				<CrudForm
					createData={createData}
					updateData={updateData}
					dataToEdit={dataToEdit}
					setDataToEdit={setDataToEdit}
				/>
				{loading && <Loader />}
				{error && (
					<Message
						msg={`Error ${error.status}: ${error.statusText}`}
						bgColor="#dc3545"
					/>
				)}
				{db && !error && (
					<CrudTable
						data={db}
						setDataToEdit={setDataToEdit}
						deleteData={deleteData}
					/>
				)}
			</article>
		</div>
	);
};

export default CrudApi;
