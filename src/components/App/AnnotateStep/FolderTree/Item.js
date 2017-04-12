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
    // if this is a file, data would be filePath
    // if this is a folder, data would be sub-tree
    const { fileName, data, file, selected, annotations } = this.props;
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
            {fileName}{!!annotations &&
              <span>
                <span> - </span>
                <span className={s.annotations}>
                  {annotations} đánh dấu
                </span>
              </span>
            }
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
    const { selectFile, data: filePath, file } = this.props;
    selectFile(filePath, file)
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
  annotations: typeof props.data === 'string' 
    ? (state.annotations[props.data] || []).length
    : undefined,
})

const actions = dispatch => ({
  selectFile: (filePath, file) => {
    dispatch({
      type: 'SELECT_FILE',
      payload: { filePath }
    })

    // Load photo if it is an image
    if (file && file.type.match(/image/)) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        dispatch({
          type: 'LOAD_PHOTO',
          payload: { dataURL: evt.target.result }
        })
      }
      reader.readAsDataURL(file)
    } else {
      dispatch({
        type: 'LOAD_PHOTO',
        payload: { dataURL: null }
      })
    }
  }
})

export default connect(mapStateToProps, actions)(Item)
