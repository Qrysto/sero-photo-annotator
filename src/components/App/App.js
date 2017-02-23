import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import UrlInput from './UrlInput';
import Annotator from './Annotator';
import Result from './Result';

import s from './App.css';

export default function App() {
	return (
		<div className={s.root}>
      <Container>
        <Header as="h1" textAlign="center">
          Sero.ai Photo Annotator
        </Header>

		    <UrlInput />

        <Annotator />

        <Result />
      </Container>
		</div>
	);
};
