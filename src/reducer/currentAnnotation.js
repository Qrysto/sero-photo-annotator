import createReducer from '../helpers/createReducer';

// Index of the current annotation
// State type: number
const initialState = null;

export default createReducer(
  initialState, 
  {
    RESET_ANNOTATIONS: () => (
      initialState
    ),

    SELECT_FILE: () => (
      initialState
    ),

    SELECT_ANNOTATION: (state, { payload: { index } }) => (
      index
    ),
  }
);
