import { connect } from 'react-redux';
import Annotation from './Annotation';

const mapStateToProps = (state, props) => ({
  selected: state.currentAnnotation === props.index,
});

const actions = {
  selectAnnotation: (index) => ({
    type: 'SELECT_ANNOTATION',
    payload: { index }
  }),
  clearSelection: () => ({
    type: 'SELECT_ANNOTATION',
    payload: { index: null }
  }),
  tagDisease: (index, disease) => (dispatch, getState) => {
    dispatch({
      type: 'TAG_DISEASE',
      payload: { index, disease, filePath: getState().currentFilePath }
    })
  },
}

export default connect(mapStateToProps, actions)(Annotation);
