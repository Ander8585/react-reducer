import { TYPES } from "./../actions/crudActions";

export const crudInitialState = {
	db: null,
};

export function crudReducer(state, action) {
	switch (action.type) {
		case TYPES.CREATE_DATA:
			return { ...state, db: [...state.db, action.payload] };
		case TYPES.READ_ALL_DATA: {
			return {
				...state,
				db: action.payload.map((data) => data),
			};
		}
		case TYPES.UPDATE_DATA:
			return {
				...state,
				db: state.db.map((item) =>
					item.id === action.payload.id ? action.payload : item
				),
			};
		case TYPES.DELETE_DATA:
			return {
				...state,
				db: state.db.filter((item) => item.id !== action.payload.id),
			};
		case TYPES.NO_DATA:
			return crudInitialState;
		default:
			return state;
	}
}
