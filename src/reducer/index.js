import { combineReducers } from 'redux';
import photoSize from './photoSize';
import annotations from './annotations';
import files from './files';
import currentFilePath from './currentFilePath';
import photoDataURL from './photoDataURL';
import currentAnnotation from './currentAnnotation';

export default combineReducers({
	photoSize,
  annotations,
  files,
  currentFilePath,
  photoDataURL,
  currentAnnotation,
});
