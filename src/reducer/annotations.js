import createReducer from '../helpers/createReducer';
import update from 'immutability-helper'

// State shape:
// {
//  [filePath]: [{
//    vertices: [
//       { x, y },
//       ...
//     ],
//     disease: 'string',
//   }],
//   ...
// }
const initialState = {};

export default createReducer(
  initialState, 
  {
    RESET_ANNOTATIONS: (state, { payload: { filePath } }) => ({
      ...state,
      [filePath]: []
    }),

    ADD_ANNOTATION: (state, { payload: { filePath } }) => {
      const newAnnotations = state[filePath] || []

      return {
        ...state,
        [filePath]: update(newAnnotations, {
          $push: [{
            vertices: [],
            disease: '',
          }]
        })
      }
    },

    ADD_VERTEX: (state, { payload: { filePath, index, x, y } }) => (
      update(state, {
        [filePath]: {
          [index]: {
            vertices: {
              $push: [{ x, y }]
            }
          }
        }
      })
    ),

    REMOVE_VERTEX: (state, { payload: { filePath, index, vertexIndex } }) => (
      update(state, {
        [filePath]: {
          [index]: {
            vertices: {
              $splice: [[ vertexIndex, 1 ]]
            }
          }
        }
      })
    ),

    TAG_DISEASE: (state, { payload: { filePath, index, disease } }) => (
      update(state, {
        [filePath]: {
          [index]: {
            disease: {
              $set: disease
            }
          }
        }
      })
    ),
  }
);
