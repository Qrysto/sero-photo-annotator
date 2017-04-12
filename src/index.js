import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';

import App from './components/App';

// Setup Redux store
const store = createStore({});

// Render the app
function renderApp(App) {
  ReactDOM.render(
  	<Provider store={store}>
  		<App />
  	</Provider>,
  	document.getElementById('root')
  );
}

// Render app to the DOM
renderApp(App);

// Enable Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default;
    renderApp(newApp);
  });
}
