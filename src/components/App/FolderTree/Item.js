import React from 'react';
import { List } from 'semantic-ui-react';
import ItemList from './ItemList';

export default class Item extends React.Component {
  render() {
    const { fileName, data } = this.props;
    const isFolder = !(data instanceof File);

    return (
      <List.Item>
        <List.Icon name={isFolder ? 'folder' : 'file'} />
        <List.Content>
          <List.Description>{fileName}</List.Description>
          {isFolder && 
            <ItemList tree={data} />
          }
        </List.Content>
      </List.Item>
    );
  }
}
