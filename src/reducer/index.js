import { combineReducers } from 'redux';
import photoSize from './photoSize';
import polygon from './polygon';
import files from './files';
import currentFilePath from './currentFilePath';
import photoDataURI from './photoDataURI';

export default combineReducers({
	photoSize,
  polygon,
  files,
  currentFilePath,
  photoDataURI,
});
