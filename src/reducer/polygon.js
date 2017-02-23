import createReducer from '../helpers/createReducer';

const initialState = [];

export default createReducer(
  initialState, 
  {
    LOAD_PHOTO: () =>
      initialState,

    RESET: () =>
      initialState,

    ADD_VERTEX: (state, { payload: { x, y } }) =>
      [ ...state, { x, y } ],
  }
);
