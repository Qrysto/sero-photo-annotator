import { combineReducers } from 'redux';
import photoID from './photoID';
import photoSize from './photoSize';
import polygon from './polygon';

export default combineReducers({
	photoID,
	photoSize,
  polygon,
});
