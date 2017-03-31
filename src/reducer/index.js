import { combineReducers } from 'redux';
import photoSize from './photoSize';
import polygon from './polygon';
import files from './files';
import currentFilePath from './currentFilePath';
import photoDataURL from './photoDataURL';

export default combineReducers({
	photoSize,
  polygon,
  files,
  currentFilePath,
  photoDataURL,
});
