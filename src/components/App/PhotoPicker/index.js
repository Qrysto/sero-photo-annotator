import { connect } from 'react-redux';
import PhotoPicker from './PhotoPicker';

const actions = {
  loadPhoto: photoID => ({
    type: 'LOAD_PHOTO',
    payload: { photoID },
  })
};

export default connect(null, actions)(PhotoPicker);
