import { connect } from 'react-redux';
import Annotator from './Annotator';

const mapStateToProps = state => ({
  photoID: state.photoID,
  photoSize: state.photoSize,
  polygon: state.polygon,
});

const actions = {
  photoLoaded: (width, height, naturalWidth, naturalHeight) => ({
    type: 'PHOTO_LOADED',
    payload: { width, height, naturalWidth, naturalHeight },
  }),

  addVertex: (x, y) => ({
    type: 'ADD_VERTEX',
    payload: { x, y },
  }),

  reset: () => ({
    type: 'RESET',
  }),
};

export default connect(mapStateToProps, actions)(Annotator);
