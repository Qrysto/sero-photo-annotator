import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducer';

export default function(initialState) {
	const middlewares = [];

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	const composeEnhancers = (
		process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	) || compose;

	const store = createStore(reducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares)
	));

	return store;
}
