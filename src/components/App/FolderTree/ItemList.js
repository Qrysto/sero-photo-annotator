import React from 'react';
import { List } from 'semantic-ui-react';
import Item from './Item';

export default function ItemList({ tree, root = false }) {
  const Root = root ? List : List.List;

  return (
    <Root>
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
