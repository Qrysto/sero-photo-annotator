import React from 'react';
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react';
import ItemList from './ItemList';
import cn from 'classnames';

import s from './Item.css'

export class Item extends React.PureComponent {
  state = {
    hover: false,
    collapsed: false, // for folders only
  };

  render() {
    const { fileName, data, file, selected } = this.props;
    const { hover, collapsed } = this.state;

    return (
      <List.Item >
        <List.Icon 
          className={cn(s.icon, { [s.hover]: hover } )}
          name={file ? 'file' : collapsed ? 'folder outline' : 'folder outline open'} 
          onClick={!file ? this.toggleFolder : this.select}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <List.Content>
          <List.Description 
            onClick={!file ? this.toggleFolder : this.select}
            className={cn(s.desc, { [s.hover]: hover, [s.selected]: selected })}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            {fileName}
          </List.Description>
          {!file && 
            <ItemList tree={data} style={{ display: collapsed ? 'none' : undefined}} />
          }
        </List.Content>
      </List.Item>
    );
  }

  toggleFolder = () => {
    this.setState({ collapsed: !this.state.collapsed })
  };

  select = () => {
    this.props.selectFile(this.props.data)
  };

  handleMouseOver = () => {
    this.setState({ hover: true })
  };

  handleMouseOut = () => {
    this.setState({ hover: false })
  };
}

const mapStateToProps = (state, props) => ({
  file: typeof props.data === 'string' ? state.files[props.data] : undefined,
  selected: state.currentFilePath === props.data,
})

const actions = {
  selectFile: (filePath) => ({
    type: 'SELECT_FILE',
    payload: { filePath }
  })
}

export default connect(mapStateToProps, actions)(Item)
