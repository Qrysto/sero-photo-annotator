import createReducer from '../helpers/createReducer';

// State shape:
// {
//  [id]: {
//    vertices: [
//      { x, y },
//      ...
//    ],
//  },
//  ...
// }
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
