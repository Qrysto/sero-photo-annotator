import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import GooglePicker from 'react-google-picker-2';

import s from './PhotoPicker.css';

export default class PhotoPicker extends Component {
  static propTypes = {
    loadPhoto: PropTypes.func.isRequired,
  };

  state = {
    parent: 'root',
  };

  render() {
    const { parent } = this.state;

    return (
      <div className={s.root}>
        <GooglePicker 
          viewId="DOCS_IMAGES"
          docsView={{
            parent,
            includeFolders: true,
          }}
          clientId="920266114103-35pjmg0p77k85kgp848pmai3a7c4ie9l.apps.googleusercontent.com"
          developerKey="AIzaSyA6KBuZpXjP-LYqvclB3B4E5TBppftCBto"
          scope={['https://www.googleapis.com/auth/drive.readonly']}
          onChange={this.onPhotoPicked}
        >
          <Button primary size="large">
            Chọn ảnh
          </Button>
        </GooglePicker>
      </div>
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onPhotoPicked = (data = {}) => {
    if (data.action === 'picked' && data.docs && data.docs[0]) {
      this.props.loadPhoto(data.docs[0].id);
      this.setState({ parent: data.docs[0].parentId });
    }
  };
}
