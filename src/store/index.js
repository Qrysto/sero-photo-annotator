import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducer';
import storageMiddleware, { loadStoredData } from './storageMiddleware';

export default function(initialState) {
	let state = initialState;
	const middlewares = [thunk];

	if (typeof localStorage !== 'undefined') {
		middlewares.push(storageMiddleware);
		state = loadStoredData(state);
	}

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	const composeEnhancers = (
		process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	) || compose;

	const store = createStore(reducer, state, composeEnhancers(
		applyMiddleware(...middlewares)
	));

	return store;
}
