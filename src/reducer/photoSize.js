import createReducer from '../helpers/createReducer';

const initialState = null;

export default createReducer(
  initialState, 
  {
    PHOTO_LOADED: (state, { payload: { width, height, naturalWidth, naturalHeight } }) =>
      ({ width, height, naturalWidth, naturalHeight }),
  }
);
