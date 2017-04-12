import { connect } from 'react-redux';
import FolderPicker from './FolderPicker';

const actions = {
  pickFolder: files => ({
    type: 'PICK_FOLDER',
    payload: { files },
  })
};

export default connect(null, actions)(FolderPicker);
