import { connect } from 'react-redux';
import Result from './Result';

const mapStateToProps = state => ({
  polygon: state.polygon,
});

export default connect(mapStateToProps)(Result);
