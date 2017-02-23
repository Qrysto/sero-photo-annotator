import { connect } from 'react-redux';
import Annotator from './Annotator';

const mapStateToProps = state => ({
  photoURL: state.photoURL,
  photoSize: state.photoSize,
  polygon: state.polygon,
});

const actions = {
  photoLoaded: (width, height) => ({
    type: 'PHOTO_LOADED',
    payload: { width, height },
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
