import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import createStore from './store';

import App from './components/App';

// Setup Redux's store
const store = createStore({});

// Render the app
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

firebase.initializeApp({
  apiKey: "AIzaSyDbXohFxVeFgwKtiZfTKCVApq2tv0bkpgI",
  authDomain: "sero-annotator.firebaseapp.com",
  databaseURL: "https://sero-annotator.firebaseio.com",
  storageBucket: "sero-annotator.appspot.com",
  messagingSenderId: "920266114103"
});
