import React from 'react';
import { List } from 'semantic-ui-react';
import Item from './Item';

export default class ItemList extends React.PureComponent {
  render() {
    const { tree, root = false, ...rest } = this.props;
    const Root = root ? List : List.List;

    return (
      <Root {...rest}>
        {Object.keys(tree).map(fileName => 
          <Item 
            key={fileName}
            fileName={fileName} 
            data={tree[fileName]} 
          />
        )}
      </Root>
    );
   }
}
