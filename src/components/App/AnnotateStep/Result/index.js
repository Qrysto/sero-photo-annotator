import { connect } from 'react-redux';
import Result from './Result';

const mapStateToProps = state => ({
  annotations: state.annotations[state.currentFilePath],
  currentAnnotation: state.currentAnnotation,
  photoReady: !!state.photoDataURL,
});

const actions = {
  addAnnotation: () => (dispatch, getState) => {
    const filePath = getState().currentFilePath

    dispatch({
      type: 'ADD_ANNOTATION',
      payload: { filePath }
    })

    dispatch({
      type: 'SELECT_ANNOTATION',
      payload: { 
        index: getState().annotations[filePath].length - 1 
      }
    })
  },

  selectAnnotation: (index) => ({
    type: 'SELECT_ANNOTATION',
    payload: { index }
  })
}

export default connect(mapStateToProps, actions)(Result);
