import { combineReducers } from 'redux';
import photoURL from './photoURL';
import photoSize from './photoSize';
import polygon from './polygon';

export default combineReducers({
	photoURL,
	photoSize,
  polygon,
});
