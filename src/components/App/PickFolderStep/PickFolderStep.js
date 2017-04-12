import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import FolderPicker from './FolderPicker';

import s from './PickFolderStep.css';

export default function PickFolderStep() {
  return (
    <div className={s.root}>
      <Container>
        <Header as="h1" textAlign="center">
          Sero.ai Photo Annotator
        </Header>

        <FolderPicker />
      </Container>
    </div>
  );
};
