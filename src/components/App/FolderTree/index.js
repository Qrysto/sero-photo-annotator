import { connect } from 'react-redux';
import FolderTree from './FolderTree';

const mapStateToProps = state => ({
  tree: state.files && Object.keys(state.files).reduce(
    (list, filePath) => {
      const file = state.files[filePath];
      const names = filePath.split('/');

      let obj = list;
      for (let i = 0; i < names.length - 1; i++) {
        const name = names[i];

        if (!obj[name]) obj[name] = {};
        obj = obj[name];
      }
      obj[names[names.length - 1]] = file;

      return list;
    },
    {}
  )
})

const actions = {
  pickFile: filePath => ({
    type: 'PICK_FILE',
    payload: { filePath },
  })
};

export default connect(mapStateToProps, actions)(FolderTree);
