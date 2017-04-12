import React, { Component, PropTypes } from 'react';
import ItemList from './ItemList';

import s from './FolderTree.css';

export default class FolderTree extends Component {
  static propTypes = {
    tree: PropTypes.object,
  };

  render() {
    const { tree } = this.props;

    return tree && (
      <ItemList root tree={tree} className={s.root} />
    );
  }
}
