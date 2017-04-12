import { connect } from 'react-redux';
import FolderTree from './FolderTree';
import { createSelector } from 'reselect';

const selectFiles = state => state.files;

// generate tree of filePaths from list of filePaths
const selectTree = createSelector(
  selectFiles,
  (files) => files && Object.keys(files).reduce(
    (list, filePath) => {
      const names = filePath.split('/');

      // let pointer go through each file name level
      // then assign filePath to the deepest level
      let pointer = list;
      for (let i = 0; i < names.length - 1; i++) {
        const name = names[i];

        if (!pointer[name]) pointer[name] = {};
        pointer = pointer[name];
      }
      const fileName = names[names.length - 1];
      pointer[fileName] = filePath;

      return list;
    },
    {}
  )
)

const mapStateToProps = state => ({
  tree: selectTree(state)
})

const actions = {
  pickFile: filePath => ({
    type: 'PICK_FILE',
    payload: { filePath },
  })
};

export default connect(mapStateToProps, actions)(FolderTree);
