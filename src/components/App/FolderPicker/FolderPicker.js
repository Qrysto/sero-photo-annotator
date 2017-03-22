import React, { Component, PropTypes } from 'react';

import s from './FolderPicker.css';

export default class FolderPicker extends Component {
  static propTypes = {
    pickFolder: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <input 
          ref={i => i && (i.webkitdirectory = true)}
          type="file" 
          multiple 
          onChange={this.handleFolderPick}
        />
      </div>
    );
  }

  handleFolderPick = (evt) => {
    const list = [...evt.target.files];

    const files = {};
    for (const file of list) {
      files[file.webkitRelativePath] = file;
    }

    this.props.pickFolder(files);
  };
}
