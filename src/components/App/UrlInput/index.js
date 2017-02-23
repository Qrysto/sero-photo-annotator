import { connect } from 'react-redux';
import UrlInput from './UrlInput';

const actions = {
  loadPhoto: photoURL => ({
    type: 'LOAD_PHOTO',
    payload: { photoURL },
  })
};

export default connect(null, actions)(UrlInput);
