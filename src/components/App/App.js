import React from 'react';
import PickFolderStep from './PickFolderStep';
import AnnotateStep from './AnnotateStep';

export default function App({ folderPicked }) {
  if (!folderPicked) {
    return <PickFolderStep />
  } else {
    return <AnnotateStep />
  }
};
