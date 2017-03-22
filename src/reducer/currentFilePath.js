import createReducer from '../helpers/createReducer';

const initialState = null;

export default createReducer(
  initialState, 
  {
    SELECT_FILE: (state, { payload: { filePath } }) =>
      filePath,
  }
);
