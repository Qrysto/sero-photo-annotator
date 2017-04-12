import { connect } from 'react-redux';
import Annotator from './Annotator';

const mapStateToProps = state => ({
  photoDataURL: state.photoDataURL,
  photoSize: state.photoSize,
  annotations: state.annotations[state.currentFilePath],
  currentAnnotation: state.currentAnnotation,
});

const actions = {
  photoLoaded: (width, height, naturalWidth, naturalHeight) => ({
    type: 'PHOTO_LOADED',
    payload: { width, height, naturalWidth, naturalHeight },
  }),

  addVertex: (index, x, y) => (dispatch, getState) => {
    dispatch({
      type: 'ADD_VERTEX',
      payload: { index, x, y, filePath: getState().currentFilePath },
    })
  },
};

export default connect(mapStateToProps, actions)(Annotator);
