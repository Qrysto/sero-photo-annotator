import React from 'react';
import { List } from 'semantic-ui-react';
import ItemList from './ItemList';
import cn from 'classnames';

import s from './Item.css'

export default class Item extends React.PureComponent {
  state = {
    hover: false,
    collapsed: false, // for folders only
  };

  render() {
    const { fileName, data } = this.props;
    const { hover, collapsed } = this.state;
    const isFolder = !(data instanceof File);

    return (
      <List.Item >
        <List.Icon 
          className={cn(s.icon, { [s.hover]: hover } )}
          name={!isFolder ? 'file' : collapsed ? 'folder outline' : 'folder outline open'} 
          onClick={isFolder ? this.toggleFolder : undefined}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <List.Content>
          <List.Description 
            onClick={isFolder ? this.toggleFolder : undefined}
            className={cn(s.desc, { [s.hover]: hover })}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            {fileName}
          </List.Description>
          {isFolder && 
            <ItemList tree={data} style={{ display: collapsed ? 'none' : undefined}} />
          }
        </List.Content>
      </List.Item>
    );
  }

  toggleFolder = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  handleMouseOver = () => {
    this.setState({ hover: true })
  };

  handleMouseOut = () => {
    this.setState({ hover: false })
  };
}
