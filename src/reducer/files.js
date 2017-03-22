import createReducer from '../helpers/createReducer';

// Object mapping filePath to File
const initialState = null;

export default createReducer(
  initialState, 
  {
    PICK_FOLDER: (state, { payload: { files } }) =>
      files,
  }
);
