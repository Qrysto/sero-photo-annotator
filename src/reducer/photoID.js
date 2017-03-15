import createReducer from '../helpers/createReducer';

const initialState = null;

export default createReducer(
  initialState, 
  {
    LOAD_PHOTO: (state, { payload: { photoID } }) =>
      photoID,
  }
);
