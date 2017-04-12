import { connect } from 'react-redux'
import App from './App';

const mapStateToProps = state => ({
  folderPicked: !!state.files
})

export default connect(mapStateToProps)(App)
